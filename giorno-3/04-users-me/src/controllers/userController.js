import { asyncHandler } from '../utils/asyncHandler.js';
import * as userService from '../services/userService.js';

export const getMe = asyncHandler(async (req, res) => {
  // req.user.userId arriva dal payload JWT (popolato da verifyToken)
  const profile = userService.getProfile(req.user.userId);
  res.json(profile);
});

export const updateMe = asyncHandler(async (req, res) => {
  const updated = await userService.updateProfile(req.user.userId, req.body);
  res.json(updated);
});

export const deleteMe = asyncHandler(async (req, res) => {
  userService.deleteAccount(req.user.userId);
  res.sendStatus(204);
});
