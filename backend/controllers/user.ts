import { StatusCodes } from "http-status-codes";


// gets all users their passwords
/* export const getAllUsers = async (req: any, res: any) => {
  console.log(req.user);
  const users = await user.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
}; 
*/

// gets a single user without their password
/* export const getSingleUser = async (req: any, res: any) => {
  const singleUser = await user.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ singleUser });
};
*/

// returns currently signed-in user
export const showCurrentUser = async (req: any, res: any) => {
  console.log('req.user - ', req.user)
  const {user: { name }} = req.user
  res.status(StatusCodes.OK).json({ user: name});
};