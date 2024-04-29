import Post from "../models/postModel.js"; // Importing the Post model from a file named postModel.js
import { errorHandler } from "../utils/error.js"; // Importing an error handler utility function

// Controller function to create a new post
export const createPost = async (req, res, next) => {
  // Checking if the user is an admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post")); // If the user is not an admin, return a 403 Forbidden error
  }
  // Checking if the required fields (title and content) are provided in the request body
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields")); // If required fields are missing, return a 400 Bad Request error
  }
  // Generating a slug for the post based on the title
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ""); // Replace spaces with dashes and remove special characters from the title to create a slug
  // Creating a new Post instance with data from the request body and other details
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id, // Assigning the ID of the user creating the post
  });
  try {
    // Saving the new post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Responding with the saved post data
  } catch (error) {
    next(error); // Passing any errors to the error handler middleware
  }
};

// Controller function to get posts
export const getposts = async (req, res, next) => {
  try {
    // Parsing query parameters for pagination (startIndex, limit) and sorting (order)
    const startIndex = parseInt(req.query.startIndex) || 0; // Starting index for pagination (default is 0)
    const limit = parseInt(req.query.limit) || 9; // Number of posts to fetch per page (default is 9)
    const sortDirection = req.query.order === "asc" ? 1 : -1; // Sorting direction (ascending or descending)
    // Querying the database for posts based on various criteria
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }), // Filter by user ID if provided
      ...(req.query.category && { category: req.query.category }), // Filter by category if provided
      ...(req.query.slug && { slug: req.query.slug }), // Filter by slug if provided
      ...(req.query.postId && { _id: req.query.postId }), // Filter by post ID if provided
      ...(req.query.searchTerm && {
        // Perform a text search if a search term is provided
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } }, // Match title case-insensitively
          { content: { $regex: req.query.searchTerm, $options: "i" } }, // Match content case-insensitively
        ],
      }),
    })
      .sort({ updatedAt: sortDirection }) // Sort posts by updatedAt field in the specified direction
      .skip(startIndex) // Skip posts according to the pagination
      .limit(limit); // Limit the number of posts to fetch

    // Counting total number of posts in the database
    const totalPosts = await Post.countDocuments();

    // Counting number of posts created in the last month
    const now = new Date(); // Get current date
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    ); // Calculate date one month ago
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }, // Count posts created after the date one month ago
    });

    // Responding with the fetched posts, total post count, and count of posts created in the last month
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error); // Passing any errors to the error handler middleware
  }
};

//delete post functionality
export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete thi post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("post has been deleted");
  } catch (error) {
    next(error);
  }
};
export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
