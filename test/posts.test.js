const app = require('../app.js');

const {
    handleGetPost,
    handleGetSinglePost,
    handlePostPost,
    handleRemovePost,
    handleUpdatePost,
  } = require('../controller/posts');


test('Get back all  the posts',async () => {
  const post = await handleGetPost();
      expect(typeof post[0].title).toBe("string");
      expect(typeof post[0].description).toBe("string");
      expect(typeof post[0].writer).toBe("object");
      expect(typeof post[0].likes).toBe("object");
});

test('Get back a specific post', async () => {
  expect.assertions(2);
  const data = await handleGetSinglePost("62dd23195679c8c276ad010c");
  expect(data.title).toEqual("1111");
  expect(data.description).toEqual("1111");
});

test.todo('Create a new post');

test.todo('Remove a specific post');

test.todo('Update a spcecific post');

