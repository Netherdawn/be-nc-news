exports.formatDates = list => {
  const newList = [];
  if (list.length === 0) {
    return [];
  } else {
    list.forEach(item => {
      let convertedDate = new Date(item.created_at);
      convertedDate = convertedDate.toUTCString();
      newList.push({ ...item, created_at: convertedDate });
    });
    return newList;
  }
};

exports.makeRefObj = list => {
  const obj = {};
  if (list.length > 0) {
    list.forEach(item => {
      obj[item.title] = item.article_id;
    });
  }
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  const newComments = [];
  if (comments.length > 0) {
    comments.forEach(item => {
      newComments.push({ ...item, article_id: articleRef[item.belongs_to] });
    });
  }
  return newComments;
};
