import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { sendEmail } from "../../utils/sendEmail";

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB();

  sendEmail(
    "imranislamjishan80@gmail.com",
    "John Doe",
    "Toyota Corolla",
    "2023-06-01",
    "2023-06-10",
    150
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User is retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await UserService.getSingleUserFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await UserService.updateUserIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is update successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await UserService.deleteSingleUserFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is delete successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await UserService.getMeFromDb(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMe,
};
