exports.up = function(knex) {
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable.text("body").notNullable();
    commentTable.string("belongs_to").notNullable();
    commentTable.integer("article_id").references("articles.article_id");
    commentTable
      .string("created_by")
      .references("users.username")
      .notNullable();
    commentTable.integer("votes").defaultTo(0);
    commentTable.timestamp("created_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
