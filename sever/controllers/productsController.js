const pool = require("../db");
class productsController {
  //
  async getProducts(req, res) {
    try {
      const [product] = await pool.query("select * from products");
      // const [variant] = await pool.query(
      //   `SELECT color.name as namecolor,color.code,size.name as namesize from product_color_size,color,size,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and product_color_size.size_id=size.id`
      // );
      let productVariants = await Promise.all(product.map(async (e) => {
        const [variant] = await pool.query(
          `SELECT color.name as namecolor, color.code, size.name as namesize 
          FROM product_color_size, color, size, products 
          WHERE product_color_size.product_id=products.id 
            AND product_color_size.color_id=color.id 
            AND product_color_size.size_id=size.id 
            AND products.id=?`,
          [e.id]
        );
        return {variant,...e}
      }));
      res.status(200).json(productVariants);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }
  // Get product variant by id
  async getProductVariantById(req, res) {
    const id = req.params.id;
    try {
      const [product] = await pool.query(
        "select * from products where id = ?",
        [id]
      );
      const [variant] = await pool.query(
        `SELECT color.name as namecolor,color.code,size.name as namesize from product_color_size,color,size,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and product_color_size.size_id=size.id and products.id=?`,
        [id]
      );
      res.status(200).json(Object.assign({ variant }, product[0]));
    } catch (error) {
      res.status(500).json({ error: "Not Found" });
    }
  }

  // Get product by id
  async getProductById(req, res) {
    try {
      const [row, fields] = await pool.query(
        `select * from products where id=${req.params.id}`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  //Get color and size product
  async getVariantById(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT color.name as namecolor,color.code,size.name as namesize from product_color_size,color,size,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and product_color_size.size_id=size.id and products.id=${req.params.id}`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  //Search product
  async getSearchProduct(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT * from products where name like'%${req.query.q}%'`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  // Get image product
  async getProductImageById(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT product_images.image from products,product_images where product_images.product_id = products.id and products.id=${req.params.id}`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  // Get color product
  async getColorProducts(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT DISTINCT color.name,color.id,color.code from product_color_size,color,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  //Get Size product
  async getSizeProducts(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT DISTINCT size.name,size.id from product_color_size,size,products WHERE product_color_size.product_id=products.id and product_color_size.size_id=size.id`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  // Get categories
  async getCategoryProducts(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT categories.id,categories.name,count(products.id) as countproduct from categories,products where categories.id=products.category_id GROUP BY categories.name`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }
  async getBrandProducts(req, res) {
    try {
      const [row, fields] = await pool.query(
        `SELECT brand.id, brand.name, COUNT(products.id) AS countproduct
        FROM brand, products
        WHERE brand.id = products.id_brand
        GROUP BY brand.id, brand.name`
      );
      res.json(row);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not Found" });
    }
  }

  //Filter product 
  async filterProducts(req, res) {
    const { sort, min_price, max_price, color, size } = req.query;
    console.log(min_price, max_price);
    console.log("size", size);
    try {
      let condition = `IF(products.price_discount >0, products.price_discount, price) between ${min_price} and ${max_price}`;
      let query = ``;
      if (color) {
        condition += ` and color.name in ('${color.split(",").join("','")}')`;
        console.log(condition);
      }

      if (size) {
        condition += ` and size.name in ('${size.split(",").join("','")}')`;
        console.log(condition);
      }
      if (color || size) {
        query = `select distinct products.id,products.category_id,products.id_brand,products.name,products.description,products.price,products.price_discount,products.image from products,product_color_size,color,size where products.id=product_color_size.product_id and color.id = product_color_size.color_id and product_color_size.size_id=size.id and ${condition}`;
      } else {
        query = `select distinct products.id,products.category_id,products.id_brand,products.name,products.description,products.price,products.price_discount,products.image from products where ${condition}`;
      }
      if (sort && sort !== "Default") {
        query += ` order by IF(products.price_discount >0, products.price_discount, price) ${sort}`;
      }

      const [product, fields] = await pool.query(query);
      let productVariants = await Promise.all(product.map(async(e) => {
        const [variant] = await pool.query(
          `SELECT color.name as namecolor, color.code, size.name as namesize 
          FROM product_color_size, color, size, products 
          WHERE product_color_size.product_id=products.id 
            AND product_color_size.color_id=color.id 
            AND product_color_size.size_id=size.id 
            AND products.id=?`,
          [e.id]
        );
        return {variant,...e}
      }));
      res.status(200).json(productVariants);
      // if (sort && sort !== "Default") {
      //   const [row, fields] = await pool.query(
      //     `select id,category_id,id_brand,name,description,price,price_discount,image from products where IF(price_discount >0, price_discount, price) between ${min_price} and ${max_price} order by IF(price_discount >0, price_discount, price) ${sort}`
      //   );
      //   res.json(row);
      // } else {
      //   const [row, fields] = await pool.query(`select * from products  where IF(price_discount >0, price_discount, price) between ${min_price} and ${max_price}`);
      //   res.json(row);
      // }
    } catch (error) {
      res.status(500).json({ error: "Not Found" });
    }
  }
}
module.exports = new productsController();
