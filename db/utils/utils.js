exports.formatDates = list => {
  const newList = [];

  list.forEach(item => {
    let convertedDate = new Date(item.created_at);
    convertedDate = convertedDate.toUTCString();
    newList.push({ ...item, created_at: convertedDate });
  });
  return newList;
};

exports.makeRefObj = list => {
  const obj = {};
  list.forEach(item => {
    obj[item.title] = item.article_id;
  });

  return obj;
};

exports.formatComments = (comments, articleRef) => {
  const newComments = [];

  comments.forEach(item => {
    const newItem = {
      ...item,
      article_id: articleRef[item.belongs_to],
      author: item.created_by
    };
    delete newItem.created_by;
    delete newItem.belongs_to;
    newComments.push(newItem);
  });

  return newComments;
};
