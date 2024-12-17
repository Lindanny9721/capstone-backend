import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})
userSchema.pre("save",  function(next) {
    if(!this.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) return next(err);
                this.password = hash;
                next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}
userSchema.index({ email: 1});
const User = mongoose.model("User", userSchema);
export default User;