import { User } from "../models/userModel.js";


export const deleteUser = async (req, res) => {
    // requesting id from parameters
    const { id } = req.params;
    try {
        // Using inbuilt method findByIdAndDelete
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User Deleted", deletedUser })
    } catch (error) {
        res.status(400).json({ message: "Failed To Delete User", deleteUser })
    }
}
export const updateUser = async (req, res) => {
    // requesting id from parameters
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
        // Using inbuilt method findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, email },
            { new: true, runValidators: true });

        // Return the updated document
        const user = await User.findById(updatedUser._id);
        res.status(200).json({ message: "User Updated", user: user });
    } catch (error) {
        res.status(400).json({ message: "Failed To update User",error:error });
    }
}


