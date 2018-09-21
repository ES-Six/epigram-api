define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/categories",
    "title": "Get all available categories of the platform",
    "name": "DeletePhotoComments",
    "group": "Category",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Category.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/v1/photo/{id}/comment",
    "title": "Post a comment to a photo",
    "name": "AddPhotoComments",
    "group": "Comment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/api/v1/photo/{id}/comment/{id_comment}",
    "title": "Delete a commments for a photo",
    "name": "DeletePhotoComments",
    "group": "Comment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          },
          {
            "group": "Parameter",
            "type": "id_comment",
            "optional": false,
            "field": "id_comment",
            "description": "<p>The id of the comment of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/api/v1/photo/{id}/comments",
    "title": "get the commments for a photo",
    "name": "GetPhotoComments",
    "group": "Comment",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/api/v1/photo/{id}/opinion",
    "title": "delete the current user opinion for a photo",
    "name": "DeleteUserOpinion",
    "group": "Opinion",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Opinion.js",
    "groupTitle": "Opinion"
  },
  {
    "type": "get",
    "url": "/api/v1/photo/{id}/opinion",
    "title": "get the current user opinion for a photo",
    "name": "GetUserOpinion",
    "group": "Opinion",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Opinion.js",
    "groupTitle": "Opinion"
  },
  {
    "type": "put",
    "url": "/api/v1/photo/{id}/opinion",
    "title": "set or update a LIKE / DISLIKE to a photo",
    "name": "SetUserOpinion",
    "group": "Opinion",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Opinion.js",
    "groupTitle": "Opinion"
  },
  {
    "type": "post",
    "url": "/api/v1/category/{category_id}/photo",
    "title": "Add a photo to a category",
    "name": "AddPhotoToCategory",
    "group": "Photo",
    "version": "1.0.0",
    "description": "<p>Warning: the file, title and description parameters must be sent to the format multipart/form-data</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "title",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the photo</p>"
          },
          {
            "group": "Parameter",
            "type": "description",
            "optional": false,
            "field": "description",
            "description": "<p>The description associated with the photo</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>The photo file (jpeg or png accepted)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: multipart/form-data",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Photo.js",
    "groupTitle": "Photo"
  },
  {
    "type": "delete",
    "url": "/api/v1/photo/{id}",
    "title": "Delete the photo",
    "name": "DeletePhoto",
    "group": "Photo",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "category_id",
            "description": "<p>The id of the category where to search for photos</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Photo.js",
    "groupTitle": "Photo"
  },
  {
    "type": "get",
    "url": "/api/v1/photo/{id}",
    "title": "Get the picture in itself",
    "name": "GetPhotoFile",
    "group": "Photo",
    "version": "1.0.0",
    "description": "<p>This call is used to get and display a photo from the photo url provided while searching photos by categories</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the photo</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be multipart/form-data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Photo.js",
    "groupTitle": "Photo"
  },
  {
    "type": "get",
    "url": "/api/v1/category/{category_id}/photos",
    "title": "Get photo by category",
    "name": "GetPhotosDataByCategory",
    "group": "Photo",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "category_id",
            "optional": false,
            "field": "category_id",
            "description": "<p>The id of the category where to search for photos</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/Photo.js",
    "groupTitle": "Photo"
  },
  {
    "type": "delete",
    "url": "/api/v1/user",
    "title": "Delete the user account and every ressources associated with it",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/user",
    "title": "Get current user informations",
    "name": "ReadUser",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header fields required": [
          {
            "group": "Header fields required",
            "type": "X-API-KEY",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>The api token value [required]</p>"
          },
          {
            "group": "Header fields required",
            "type": "Content-Type",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Must be application/json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "X-API-KEY",
          "content": "X-API-KEY: your_token...",
          "type": "header"
        },
        {
          "title": "Content-Type",
          "content": "Content-Type: application/json",
          "type": "header"
        }
      ]
    },
    "filename": "routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user/login",
    "title": "Login with email / password",
    "name": "UserLogin",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>The user email</p>"
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p>"
          }
        ]
      }
    },
    "filename": "routes/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user/register",
    "title": "Register a user",
    "name": "UserRegister",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "email",
            "optional": false,
            "field": "email",
            "description": "<p>The user email</p>"
          },
          {
            "group": "Parameter",
            "type": "password",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p>"
          }
        ]
      }
    },
    "filename": "routes/User.js",
    "groupTitle": "User"
  }
] });
