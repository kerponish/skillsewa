# Backend Tests

This directory contains Jest tests for the backend controllers.

## Test Files

- `authController.test.js` - Tests for authentication controller functions
- `postController.test.js` - Tests for post/task controller functions  
- `workerController.test.js` - Tests for worker controller functions

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test File
```bash
npm test authController.test.js
```

## Test Structure

Each test file follows this pattern:

1. **Mock Setup** - Mocks external dependencies (models, bcrypt, jwt)
2. **Test Cases** - Individual test cases for each controller function
3. **Mock Response** - Helper function to create mock response objects
4. **Assertions** - Verify expected behavior and responses

## Test Coverage

The tests cover:

### Auth Controller
- User signup (success and error cases)
- User login (admin and regular users)
- Password validation
- Profile management
- Password changes

### Post Controller  
- Create posts/tasks
- Fetch all posts
- Get single post by ID
- Update posts
- Delete posts
- Error handling for missing data

### Worker Controller
- Create workers
- Fetch all workers
- Get single worker by ID
- Update worker information
- Delete workers
- Error handling for database operations

## Mocking Strategy

- **Models**: All database models are mocked to avoid actual database calls
- **External Libraries**: bcrypt and jsonwebtoken are mocked for consistent testing
- **Response Objects**: Mock response objects with status and json methods
- **Request Objects**: Mock request objects with body and params properties

## Example Test Structure

```javascript
describe("Controller Name", () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Function Name", () => {
    it("should do something successfully", async () => {
      // Arrange
      const req = { /* mock request */ };
      const res = mockRes();
      
      // Act
      await controllerFunction(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
``` 