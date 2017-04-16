'use strict';

import { Model, Ref, Hook, Method, Static, String, Default, Validate, Index, Required, None, ArrayType, Date } from '../../../../config/lib/decorators';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


@Model
class User {

	@String
	@Required('Name is required')
	name;

	@String
	@Default('')
	uuid;

	@ArrayType
	@Ref('Poll')
	pols;

	// ======= Methods =========

	/**
	 * Create instance method for authenticating user
	 */
	@Method
	authenticate(uuid) {
	  return this.uuid === uuid;
	};

}

module.exports = User
