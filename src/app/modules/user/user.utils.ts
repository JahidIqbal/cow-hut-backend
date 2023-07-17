// import { User } from "./user.model";

// export const findLastUserId = async (): Promise<string | undefined> => {
//   const lastUser = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//     return lastUser?.id ? lastUser.id.substring(4) : undefined;
// };

// export const generateUserId = async () => {
//   const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0"); //00000

//   //increment by 1
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
//   //20 25
//   console.log(incrementedId);
//   return incrementedId;
// };
