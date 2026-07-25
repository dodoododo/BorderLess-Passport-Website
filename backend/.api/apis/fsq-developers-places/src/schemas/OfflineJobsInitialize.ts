const OfflineJobsInitialize = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "durationSeconds": {
            "maximum": 43200,
            "minimum": 900,
            "type": "integer",
            "format": "int32",
            "description": "The duration, in seconds, that the credentials should remain valid. Value must be between 900 and 43200 seconds. If not provided, defaults to 3600 seconds. "
          },
          "job_type": {
            "type": "string",
            "description": "The type of offline job to initialize. Supported values are: place_match, transaction_match."
          }
        },
        "required": [
          "job_type"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "X-Places-Api-Version": {
            "type": "string",
            "default": "2025-06-17",
            "enum": [
              "2025-06-17"
            ],
            "description": "The version of the API to use."
          }
        },
        "required": [
          "X-Places-Api-Version"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "access_key_id": {
          "type": "string"
        },
        "secret_access_key": {
          "type": "string"
        },
        "session_token": {
          "type": "string"
        },
        "job_id": {
          "type": "string"
        },
        "input_uri": {
          "type": "string"
        },
        "output_uri": {
          "type": "string"
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default OfflineJobsInitialize
