const OfflineJobsCredentialsRefresh = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "fsq_job_id": {
            "type": "string",
            "description": "The ID of the job to refresh credentials for."
          }
        },
        "required": [
          "fsq_job_id"
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
export default OfflineJobsCredentialsRefresh
