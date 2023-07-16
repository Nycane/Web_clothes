const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { populate } = require("dotenv");
class userController {
  async register(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      ...req.body,
      password: hashPassword,
    };
    console.log("user",user)
    try {
      const [row, fields] = await pool.query(
        "select * from users where email = ?",
        [user.email]
      );
      console.log(row)
      if (row.length > 0) {
        res.status(400).json({ message: "Error" });
      } else {
        console.log("vo toi dau khong")
        const [row, field] = await pool.query(
          "INSERT INTO users (id_role,username,password,email,phone,address) values (?,?,?,?,?,?)",
          [
            2,
            user.fullname,
            user.password,
            user.email,
            user.phone,
            user.address,
          ]
        );
        res.status(200).json({ message: "Success" });
      }
    } catch (error) {
      console.log("Hay bi loi")
      res.status(500).json({ message: "An error occurred while registering" });
    }
  }
  async login(req, res) {
    try {
      const [row, field] = await pool.query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (row.length > 0) {
        const match = await bcrypt.compare(req.body?.password, row[0].password);
        if (match) {
          // accessToken
          const accessToken = jwt.sign(
            { id: row[0].id, username: row[0].username },
            process.env.JWT_SERECT,
            { expiresIn: "30s" }
          );
          const [row2, field2] = await pool.query(
            "select *  from refresh_token where user_id = ?",
            [row[0].id]
          );
          if (row2.length > 0) {
            await pool.query("delete from refresh_token where user_id = ? ", [
              row2[0].user_id,
            ]);
          }
          // refreshToken
          const refreshToken = jwt.sign(
            { id: row[0].id, username: row[0].username },
            process.env.JWT_SERECT_REFRESH
          );

          const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30;
          await pool.query(
            "INSERT INTO refresh_token (user_id,token,exprise) VALUES (?,?,?)",
            [row[0].id, refreshToken, expiresAt]
          );
          res.status(200).json({
           ...row[0],
            accessToken,
            refreshToken,
          });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        res.status(401).json({ message: "Incorrect account" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAllUser(req, res) {
    const [row, field] = await pool.query("select * from users");
    if (row.length > 0) {
      res.status(200).json({ message: "success", listUsers: row });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  }
  // refresh token
  async RefreshToken(req, res) {
    const token = req.body.token;
    const [row, field] = await pool.query(
      "select * from refresh_token where token = ?",
      [token]
    );
    if (row.length > 0) {
      if (!row[0].exprise < Date.now()/1000) {
        const decode = jwt.verify(row[0].token, process.env.JWT_SERECT_REFRESH);
        const accessToken = jwt.sign(
          { id: decode.id, username: decode.username },
          process.env.JWT_SERECT,
          { expiresIn: "30s" }
        );
        const refreshToken=jwt.sign(
          { id: decode.id, username: decode.username },
          process.env.JWT_SERECT_REFRESH,
        )
          await pool.query("update refresh_token set token =? where user_id=?",[refreshToken,decode.id])
        res.status(200).json({ accessToken,refreshToken});
      } else {
        res.status(401).json({ message: "refreshToken has exprise" });
      }
    } else {
      res.status(401).json({ message: "refreshToken invalid" });
    }
  }

  // handle logout
  async logout(req, res) {
    const id = req.params.id
    const [row, field] = await pool.query(
      "delete from refresh_token where user_id = ?",
      [id]
    );
    if (row.affectedRows > 0) {
      res.status(200).json({ message: "Logout Success" });
    } else {
      res
        .status(401)
        .json({
          error: "This user does not have an active session to log out!",
        });
    }
  }

  async changePassword(req, res) {
    const currentPw = req.body.currentPw;
    const newPw=req.body.newPw;
    const id = req.body.id
    const [row, field] = await pool.query(
      "select * from users where id = ?",
      [id]
    );
    if(row.length>0){
      const match = await bcrypt.compare(currentPw,row[0].password)
      if(match){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPw, salt);
        await pool.query("update users set password = ? where id = ?",[hashPassword,row[0].id])
        res.status(200).json({message:"Change Password Success"})
      }else{
        res.status(401).json({message:"Password incorrect"})
      }
    }else{
      res.status(404).json({message:"Not Found User"})
    }
  }
  // Update User
  async updateUser(req, res) {
    try {
      const {username,phone,address,email,id}=req.body;
      await pool.query("UPDATE users SET username = ? , phone = ? , address = ? , email = ? WHERE id = ?",[username,phone,address,email,id])
      const [row] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      res.status(200).json({message:"Update Success",user:row[0]})
    } catch (error) {
      res.status(500).json({message:"Update Failed"})
    }
  }

  // Comment User
  async commentUser(req, res) {
    const {productId,userId,rating,content}=req.body;
    try {
      await pool.query("insert into comments(product_id,user_id,rating,content)values(?,?,?,?)",[productId,userId,rating,content])
      res.status(200).json({message:"Comment Success"})
    } catch (error) {
      res.status(500).json({message:"Comment Failed"})
    }
  }

  // Get Comment User
  async getCommentUser(req, res) {
    const productId= req.params.id;
    try {
      const [row,field] = await pool.query("SELECT comments.id,comments.content,comments.rating,users.username,comments.create_at from users,products,comments where users.id=comments.user_id and comments.product_id = products.id AND comments.product_id = ?",[productId]);

      const [row1,field1] = await pool.query("SELECT count(comments.id) as countView, sum(comments.rating) as totalRating from users,products,comments where users.id=comments.user_id and comments.product_id = products.id AND comments.product_id = ?",[productId]);

      // console.log({listComments:row,countView:row1[0]})
      res.status(200).json({message:"Success",data:{listComments:row,count:row1[0]}})
      
    } catch (error) {
      res.status(500).json({message:"Failed"})
    }
  }
  // delete comment
  async deleteCommentUser(req, res) {
    const commentID= req.params.id;
    try {
      const [row,field] = await pool.query("Delete from comments where comments.id = ?",[commentID]);
      res.status(200).json({message:"Delete Success"})
      
    } catch (error) {
      res.status(500).json({message:"Failed"})
    }
  }
}

module.exports = new userController();
