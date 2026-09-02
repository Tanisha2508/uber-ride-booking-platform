# User Registration API

## `POST /users/register`

Registers a new user account. The password is hashed before the user is stored, and the endpoint returns an authentication token when registration succeeds.

### Request

**Content-Type:** `application/json`

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe" 
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Required Data

| Field | Type | Required | Requirements |
|---|---|---:|---|
| `fullname.firstname` | string | Yes | Must not be empty. The model requires at least 3 characters. |
| `fullname.lastname` | string | No | If provided, the model requires at least 3 characters. |
| `email` | string | Yes | Must be a valid email address. |
| `password` | string | Yes | Must be at least 6 characters long. |

### Successful Response

**Status:** `201 Created`

```json
{
  "token": "generated-jwt-token",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

The exact user object fields are determined by the User model. The password is stored as a hash, never as plain text.

### Error Responses

#### `400 Bad Request`

Returned when request validation fails. The response contains an array describing the validation errors:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please provide a valid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Common validation messages include:

- `First name is required`
- `Please provide a valid email`
- `Password must be at least 6 characters long`

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```
