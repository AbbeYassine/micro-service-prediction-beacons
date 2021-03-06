'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

exports.Model = function Model(target) {
		target.prototype.Type = 'Model'
		if(!target.prototype.Schema) {
			target.prototype.Schema = {}
		}
}

exports.Hook = function Hook(hookOrder, hookType, fun) {
	return function(target) {
		if(!target.prototype.Hooks) {
			target.prototype.Hooks = {}
		}

		if(hookOrder !== 'pre' && hookOrder !== 'post') {
			throw new Error('Hook order no supported')
		}

		if(['init', 'save', 'update', 'find', 'validate', 'remove'].indexOf(hookType) <= -1) {
			throw new Error('Hook order no supported')
		}

		target.prototype.Hooks[hookOrder] = {}
		target.prototype.Hooks[hookOrder].type = hookType
		target.prototype.Hooks[hookOrder].fun = fun

	}

}

exports.Method = function Method(target, key, descriptor) {
	if(!target.Methods) {
		target.Methods = {}
	}

	target.Methods[key] = target[key]

}

exports.Virtual = function Virtual(ref, localField, foreignField) {
  return function(target, key, descriptor) {
  	if(!target.Virtuals) {
  		target.Virtuals = {}
  	}

  	target.Virtuals[key] = {
      ref: ref,
      localField: localField,
      foreignField: foreignField,
      toJSON : {virtuals : true},
      toObject : {virtuals:true}
    }

  }
}

exports.Static = function Static(target, key, descriptor) {
	if(!target.Statics) {
		target.Statics = {}
	}

	target.Statics[key] = target[key]
}

exports.String = function String(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].type = String

}

exports.BooleanType = function BooleanType(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].type = Boolean

}

exports.NumberType = function NumberType(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].type = Number

}

exports.Ref = function Ref(value) {
	return function(target, key, descriptor) {
		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}


		target.Schema[key].type = Schema.ObjectId
		target.Schema[key].ref = value
	}

}

exports.Default = function Default(value) {
	return function(target, key, descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}
		if(typeof value === 'function') {
				target.Schema[key].default = value()
		} else {
				target.Schema[key].default = value
		}

	}
}

exports.ArrayType = function ArrayType(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key]) {
			target.Schema[key] = {}
      target.Schema[key] = []
    } else {
      var tmp = target.Schema[key]
      target.Schema[key] = []
      target.Schema[key][0] = tmp
    }


}

exports.Date = function Date(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].type = Date


}

exports.Index = function Index(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].index = {
			unique: true
		}


}

exports.None = function None(target, key , descriptor) {

		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}


}

exports.Validate = function Validate(fun, error) {
	return function(target, key , descriptor) {
		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}
		console.log(target[fun])
		target.Schema[key].validate = [target[fun], error]


	}
}

exports.Required = function Required(error) {
	return function(target, key , descriptor) {
		if(!target.Schema) {
			target.Schema = {}
		}

		if(!target.Schema[key])
			target.Schema[key] = {}

		target.Schema[key].required = error


	}
}
