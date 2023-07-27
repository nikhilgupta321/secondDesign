import sanitizeHtml from "sanitize-html";

const cleanHtml = (data) => {
  let cleanData = sanitizeHtml(data, {
    allowedTags: ["i", "em"],
    allowedAttributes: {},
  });
  return cleanData.replace(/\s+/g, " ");
};

export default cleanHtml;
