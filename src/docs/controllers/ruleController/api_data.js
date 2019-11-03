define({ "api": [
  {
    "type": "",
    "url": "delete()",
    "title": "",
    "group": "ruleController",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Delete",
            "description": "<p>rule in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"type\": \"daily\",\n    \"date\": null,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"08:00\",\n        \"end\": \"10:05\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/controllers/ruleController.js",
    "groupTitle": "ruleController",
    "name": "Delete"
  },
  {
    "type": "",
    "url": "index()",
    "title": "",
    "group": "ruleController",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Loads",
            "description": "<p>all rules stored in the database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"type\": \"daily\",\n    \"date\": null,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"08:00\",\n        \"end\": \"10:05\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/controllers/ruleController.js",
    "groupTitle": "ruleController",
    "name": "Index"
  },
  {
    "type": "",
    "url": "preriod()",
    "title": "",
    "group": "ruleController",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "List",
            "description": "<p>all period rules.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n [\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  },\n\n   {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 10-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/controllers/ruleController.js",
    "groupTitle": "ruleController",
    "name": "Preriod"
  },
  {
    "type": "",
    "url": "store()",
    "title": "",
    "group": "ruleController",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Save",
            "description": "<p>rule in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"type\": \"daily\",\n    \"date\": null,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"08:00\",\n        \"end\": \"10:05\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/controllers/ruleController.js",
    "groupTitle": "ruleController",
    "name": "Store"
  }
] });
