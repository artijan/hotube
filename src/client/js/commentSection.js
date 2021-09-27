const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComment = document.getElementById("deleteBtn");
const commentContainer = document.getElementById("video__comment-detail");

const addComment = async (text, id) => {
  const videoComments = document.querySelector(".video__comments");
  const newComment = document.createElement("div");
  newComment.dataset.id = id;
  newComment.className = "video__comment-detail";
  const img = document.createElement("img");
  img.className = "userAvatar";
  img.src = `/${videoContainer.dataset.url}`;
  const user = document.createElement("div");
  user.className = "video__comment-user";
  const userName = document.createElement("span");
  userName.className = "userName";
  userName.innerText = `${videoContainer.dataset.name}`;
  const comment = document.createElement("span");
  comment.className = "video__comment";
  comment.innerText = text;
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerText = "❌";
  user.appendChild(userName);
  user.appendChild(comment);
  newComment.appendChild(img);
  newComment.appendChild(user);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async () => {
  const commentId = commentContainer.dataset.id;
  const response = await fetch(`/api/videos/${commentId}/commentDelete`, {
    method: "DELETE",
  });

  if (response.status === 201) {
    deleteCommentEl();
  }
};

const deleteCommentEl = () => {};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteComment) {
  deleteComment.addEventListener("click", handleDelete);
}
