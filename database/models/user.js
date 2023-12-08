const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: String, required: true,default:"user" },
  cirtificate: { type: String },
  suspended: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
}, { timestamps: true },
  { collection: 'Users' }
)

Schema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

Schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err)
  }
});
Schema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      const salt = await bcrypt.genSalt(10);
      this._update.password = await bcrypt.hash(this._update.password, salt)
      
      next();
    }
  } catch (err) {
    console.log(err)
  }
})

const User = mongoose.model('User', Schema)

module.exports = User;