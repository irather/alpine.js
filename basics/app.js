document.addEventListener("alpine:init", () => {
  Alpine.data("dropdown", () => ({
    open: false,
    toggle() {
      this.open = !this.open;
    },
  }));

  Alpine.store("currentUser", {
    username: "rather",
    posts: ["Post1", "Post2"],
  });
});
