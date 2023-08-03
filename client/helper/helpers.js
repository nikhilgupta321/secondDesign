import sanitizeHtml from "sanitize-html";

function formatAuthorNames(authorString) {
  const authorNames = authorString && authorString.split(", ");
  const formattedNames = authorNames.map((name) => {
    if (name.startsWith("Dr. ")) {
      name = name.replace("Dr. ", "");
    }
    const parts = name.split(" ");
    if (parts.length >= 2) {
      const lastName = parts.pop();
      const formattedInitials = parts.map((part) => `${part[0]}.`).join(" ");
      return `${lastName} ${formattedInitials}`;
    } else {
      return `${name}.`;
    }
  });
  return formattedNames.join(", ");
}

const cleanHtml = (data) => {
  let cleanData = sanitizeHtml(data, {
    allowedTags: ["i", "em"],
    allowedAttributes: {},
  });
  return cleanData.replace(/\s+/g, " ");
};

export { formatAuthorNames, cleanHtml };
