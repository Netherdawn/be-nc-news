exports.up = function(knex) {
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable.text("body").notNullable();
    commentTable.integer("article_id").references("articles.article_id");
    commentTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentTable.integer("votes").defaultTo(0);
    commentTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
