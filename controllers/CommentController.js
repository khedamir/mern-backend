import CommentModel from "../models/Comment.js";

// export const getLastTags = async (req, res) => {
//   try {
//     const posts = await PostModel.find().limit(5).exec();
//     const tagSet = new Set(posts.map(obj => obj.tags).flat())
//     const uTags = Array.from(tagSet);

//     res.json(uTags);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Не удалось получить статьи",
//     });
//   }
// };

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").exec();
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

export const getByPostId = async (req, res) => {
    const postId = req.params.id;
    try {
      const comments = await CommentModel.find({post: postId}).populate("user").exec();
      res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить комментарии",
      });
    }
  };

export const create = async (req, res) => {
    try {
      const doc = new CommentModel({
        post: req.body.postId,
        text: req.body.text,
        user: req.userId,
      });
  
      const comment = await doc.save();
      res.json(comment);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось создать комментарий",
      });
    }
  };

// export const remove = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     PostModel.findOneAndDelete(
//       {
//         _id: postId,
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: "Не удалось удалить статью",
//           });
//         }

//         if (!doc) {
//           return res.status(404).json({
//             message: "Статья не найдена",
//           });
//         }

//         res.json({
//           success: true,
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Не удалось получить статьи",
//     });
//   }
// };




