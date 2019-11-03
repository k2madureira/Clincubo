define({ "api": [
  {
    "type": "",
    "url": "create()",
    "title": "",
    "group": "Rule",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<blockquote> <p>query.params (/rules/:type);</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<blockquote> <p>'YYYY-MM-DD';</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "days",
            "description": "<blockquote> <p>[ 'Monday', 'Friday' ];</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start",
            "description": "<blockquote> <p>09:00;</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<blockquote> <p>10:00;</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "Create"
  },
  {
    "type": "",
    "url": "delete()",
    "title": "",
    "group": "Rule",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<blockquote> <p>3;</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "Delete"
  },
  {
    "type": "",
    "url": "list()",
    "title": "",
    "group": "Rule",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules stored in the constructor rules variable</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"type\": \"daily\",\n    \"date\": null,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "List"
  },
  {
    "type": "",
    "url": "loadJson()",
    "title": "",
    "group": "Rule",
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
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "Loadjson"
  },
  {
    "type": "",
    "url": "period()",
    "title": "",
    "group": "Rule",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Using",
            "description": "<p>the query. Fild1 (since) =&gt; '01-11-2019'; Fild2 (until) =&gt; '10-11-2019';</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules in a given period;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  },\n\n   {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 10-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "Period"
  },
  {
    "type": "",
    "url": "update()",
    "title": "",
    "group": "Rule",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "days",
            "description": "<blockquote> <p>[ 'Monday', 'Friday' ];</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start",
            "description": "<blockquote> <p>09:00;</p> </blockquote>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<blockquote> <p>10:00;</p> </blockquote>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Lists",
            "description": "<p>all rules;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 2,\n    \"type\": \"specific\",\n    \"date\": 01-11-2019,\n    \"days\": [],\n    \"hours\": [\n     {\n        \"start\": \"05:00\",\n        \"end\": \"06:05\"\n      },\n      {\n        \"start\": \"06:20\",\n        \"end\": \"07:00\"\n      }\n    ]\n  }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./src/app/models/Rule.js",
    "groupTitle": "Rule",
    "name": "Update"
  }
] });
