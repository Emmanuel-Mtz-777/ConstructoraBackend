import Mongo from '../Contracts/Mongo.js';
import { Schema } from 'mongoose';

const AccessSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  resource: { 
    type: String, 
    enum: ['proyecto', 'vehiculo'], 
    required: true 
  },
  resourceId: { 
    type: Schema.Types.ObjectId, 
    required: true 
  },
  action: { 
    type: String, 
    enum: ['leer', 'crear', 'actualizar', 'eliminar'], 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export const Access = Mongo.model('Access', AccessSchema);

export class AccessModel {
    static async registerAccess(data) {
        return await Access.create(data);
    }

    static async getAccesses() {
        return await Access.find().populate('user');
    }

    static async getAccessesByUser(userId) {
        return await Access.find({ user: userId }).populate('user');
    }

    static async getAccessesByResource(resource, resourceId) {
    return await Access.find({ resource, resourceId }).populate('user');
  }

  
}
