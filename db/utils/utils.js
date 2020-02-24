exports.formatDates = list => {
  if (list.length === 0) {
    return [];
  } else {
    list.forEach(item => {
      let convertedDate = new Date(item.created_at);
      convertedDate = convertedDate.toUTCString();
      item.created_at = convertedDate;
    });
    return list;
  }
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
