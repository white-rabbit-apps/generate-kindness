const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: { type: String },  // , unique: true
  description: String
}, { timestamps: true, autoIndexId: true });

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
