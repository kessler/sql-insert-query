module.exports = function(table, object, fields, valuePlaceholder) {
	var query = 'INSERT INTO ' + table + ' ('

	fields = fields || Object.keys(object)

	var values = []

	// gather the values and concat the field names for them
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i]
		var value = object[field]

		if (value !== undefined) {
			if (values.length > 0) {
				query += ','
			}

			query += field
			values.push(value)
		}
	}

	if (values.length === 0) {
		throw new Error('missing values. the object might have no properties of field restriction does not include any of the existing properties')
	}

	// create the values placeholder part of the query
	query += ') VALUES ('

	for (var i = 0; i < values.length; i++) {
		if (i > 0) {
			query += ','
		}

		query += '?'
	}

	query += ')'


	return {
		query: query,
		values: values
	}
}