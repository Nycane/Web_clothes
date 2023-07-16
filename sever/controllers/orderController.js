const pool = require("../db");
class orderController {

  constructor() {
    this.vnp_create = this.vnp_create.bind(this);
    this.vnp_ipn = this.vnp_ipn.bind(this);
    this.vnp_return = this.vnp_return.bind(this);
  }

  // Add Order
  async addOrder(req, res) {
    const { product, info } = req.body;
    console.log(product);
    try {
      await pool.query(
        "insert into orders(user_id,total_price,coupon_code,discount_amount,status,payment_method,shipping) values (?,?,?,?,?,?,?)",
        [
          info.userId,
          product.total,
          product.isCoupoun,
          product.totalDiscount,
          0,
          info.payment,
          info.shipping,
        ]
      );
      const [orderId] = await pool.query(
        "select id from orders order by id desc"
      );
      await pool.query(
        "insert into delivery_address(order_id,fullname,address,email,phone,notes) value(?,?,?,?,?,?)",
        [
          orderId[0].id,
          info.fullname,
          info.address,
          info.email,
          info.phone,
          info.notes,
        ]
      );
      product.carts.forEach(async (e) => {
        await pool.query(
          "insert into order_details(order_id,product_id,color,size,quantity,price,total) values (?,?,?,?,?,?,?)",
          [
            orderId[0].id,
            e.id,
            e.color ? e.color : "default",
            e.size ? e.size : "default",
            e.quantity,
            e.price_discount > 0 ? e.price_discount : e.price,
            e.quantity * (e.price_discount > 0 ? e.price_discount : e.price),
          ]
        );
      });
      res.status(200).json({
        message: "Payment Success",
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  // Get Order Detail
  async getOrderDetail(req, res) {
    try {
      const [orderId] = await pool.query(
        "select id from orders order by id desc"
      );
      const [orderDetail] = await pool.query(
        " SELECT orders.id,orders.total_price,orders.discount_amount,orders.coupon_code,orders.created_at,orders.payment_method,orders.shipping,delivery_address.fullname,delivery_address.address,delivery_address.email,delivery_address.phone,delivery_address.notes FROM delivery_address,orders WHERE orders.id=delivery_address.order_id and orders.id = ?  order by orders.id",
        [orderId[0].id]
      );
      const [productDetail] = await pool.query(
        " SELECT products.name,order_details.quantity,order_details.total,order_details.color,order_details.size from products,order_details,orders WHERE order_details.order_id=orders.id and order_details.product_id=products.id and orders.id = ?",
        [orderId[0].id]
      );
      // console.log("productdetail",productDetail)
      res.status(200).json({
        message: "Succes",
        data: {
          orderDetail: orderDetail[0],
          productDetail,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Not Found" });
    }
  }

// Get Order By Id
  async getOrderDetailById(req, res) {
    try {
      const [orderDetail] = await pool.query(
        " SELECT orders.id,orders.total_price,orders.discount_amount,orders.coupon_code,orders.created_at,orders.payment_method,orders.shipping,delivery_address.fullname,delivery_address.address,delivery_address.email,delivery_address.phone,delivery_address.notes FROM delivery_address,orders WHERE orders.id=delivery_address.order_id and orders.id = ?",
        [req.params.id]
      );
      const [productDetail] = await pool.query(
        " SELECT products.name,order_details.quantity,order_details.total,order_details.color,order_details.size from products,order_details,orders WHERE order_details.order_id=orders.id and order_details.product_id=products.id and orders.id = ?",
        [req.params.id]
      );
      res.status(200).json({
        message: "Succes",
        data: {
          orderDetail: orderDetail[0],
          productDetail,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Not Found" });
    }
  }

// Get Order By Id
  async getOrderById(req, res) {
    const userId = req.params.id;
    try {
      const [orderId] = await pool.query(
        "SELECT count(order_details.order_id) as countOrder,orders.created_at,orders.id,orders.total_price,orders.discount_amount,orders.status from orders,users,order_details where users.id=orders.user_id and orders.id = order_details.order_id and orders.user_id = ? GROUP by orders.id order by orders.id asc",
        [userId]
      );
      res.status(200).json({
        message: "Success",
        data: orderId,
      });
    } catch (error) {
      res.status(500).json({ error: "Not Found" });
    }
  }

  // VNPAY----------------------------------------//
  async vnp_create(req, res) {
    const { product, info } = req.body;
    //  add info and product
    await pool.query(
      "insert into orders(user_id,total_price,coupon_code,discount_amount,status,payment_method,shipping) values (?,?,?,?,?,?,?)",
      [
        info.userId,
        product.total,
        product.isCoupoun,
        product.totalDiscount,
        1,
        info.payment,
        info.shipping,
      ]
    );
    const [orderId] = await pool.query(
      "select id from orders order by id desc"
    );
    await pool.query(
      "insert into delivery_address(order_id,fullname,address,email,phone,notes) value(?,?,?,?,?,?)",
      [
        orderId[0].id,
        info.fullname,
        info.address,
        info.email,
        info.phone,
        info.notes,
      ]
    );
    product.carts.forEach(async (e) => {
      await pool.query(
        "insert into order_details(order_id,product_id,color,size,quantity,price,total) values (?,?,?,?,?,?,?)",
        [
          orderId[0].id,
          e.id,
          e.color ? e.color : "default",
          e.size ? e.size : "default",
          e.quantity,
          e.price_discount > 0 ? e.price_discount : e.price,
          e.quantity * (e.price_discount > 0 ? e.price_discount : e.price),
        ]
      );
    });
    //  add info and product

    process.env.TZ = "Asia/Ho_Chi_Minh";
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    // var dateFormat = require("dateformat");
    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var vnpUrl = process.env.VNP_URL||"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = process.env.VNP_RETURNURL;

    console.log("vnpURL",vnpUrl)
    console.log("tmnCode",tmnCode)
    console.log("serectKey",secretKey)
    console.log("returnUrl",returnUrl)
    var date = new Date();
    const moment = require("moment");

    var createDate = moment(date).format("YYYYMMDDHHmmss");

    // var orderId = moment(date).format("DDHHmmss");
    var amount =
      product.totalDiscount > 0 ? product.totalDiscount : product.total;
    var bankCode = req.body.bankCode;
    var locale = req.body.language;

    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId[0].id;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId[0].id;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    vnp_Params = this.sortObject(vnp_Params);
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    console.log("VNp url",vnpUrl);
    res.status(200).json({ message: "Success", data:vnpUrl });
  }

  async vnp_ipn(req, res) {
    console.log("vnp_ipn", req.query);
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];
    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];
    console.log("rsCode", rspCode);
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = this.sortObject(vnp_Params);
    var secretKey = process.env.VNP_HASHSECRET;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update( Buffer.from(signData, "utf-8")).digest("hex");
    let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
      //kiểm tra checksum
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus == "0") {
            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode == "00") {
              //thanh cong
              //paymentStatus = '1'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              res.status(200).json({ rspCode, Message: "Success" });
            } else {
              //that bai
              //paymentStatus = '2'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              console.log("That bai");
              await pool.query(
                "DELETE orders, delivery_address, order_details FROM orders JOIN order_details ON orders.id = order_details.order_id JOIN delivery_address ON orders.id = delivery_address.order_id WHERE orders.id = ?",
                [orderId]
              );
              res.status(200).json({ rspCode, Message: "Failed" });
            }
          } else {
            res.status(200).json({
              RspCode: "02",
              Message: "This order has been updated to the payment status",
            });
          }
        } else {
          res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
        }
      } else {
        res.status(200).json({ RspCode: "01", Message: "Order not found" });
      }
    } else {
      res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
    }
  }
  vnp_return(req, res) {
    console.log("vnp_return", req.query);
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = this.sortObject(vnp_Params);
    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    if (secureHash === signed) {
      console.log(vnp_Params["vnp_ResponseCode"]);
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res
        .status(200)
        .json({ message: "Success", code: vnp_Params["vnp_ResponseCode"] });
      // res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.status(500).json({ message: "Faild", code: "97" });
    }
  }
  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
  // VNPAY----------------------------------------//
}

module.exports = new orderController();
