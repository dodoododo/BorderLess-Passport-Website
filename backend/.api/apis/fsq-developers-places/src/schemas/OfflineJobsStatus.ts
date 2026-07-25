const OfflineJobsStatus = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "job_ids": {
            "type": "string",
            "description": "An optional comma-separated list of IDs of the Places API offline jobs to get statuses for. These IDs are returned when Places API offline jobs are initialized. If not provided, statuses for all of your previously submitted jobs will be returned."
          }
        }
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
        "job_statuses": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "object",
            "properties": {
              "job_id": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "start_time": {
                "type": "object",
                "additionalProperties": true
              },
              "end_time": {
                "type": "object",
                "additionalProperties": true
              },
              "errors": {
                "type": "array",
                "properties": {
                  "traversable_again": {
                    "type": "boolean"
                  }
                },
                "items": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default OfflineJobsStatus
