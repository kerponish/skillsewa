describe("Simple Test", () => {
  it("should pass", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle strings", () => {
    expect("hello" + " world").toBe("hello world");
  });

  it("should handle arrays", () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
  });
}); 