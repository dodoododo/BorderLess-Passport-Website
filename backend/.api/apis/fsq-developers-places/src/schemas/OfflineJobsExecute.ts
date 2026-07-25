const OfflineJobsExecute = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "fsq_job_id": {
            "type": "string",
            "description": "The ID of the offline job to execute."
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
          "country_codes": {
            "type": "string",
            "description": "The list of country codes to include in the job. Valid country codes can be found [here](https://docs.foursquare.com/fsq-developers-places/reference/batch-place-match-1#valid-countries). This is only required for place_match jobs."
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
        "job_id": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default OfflineJobsExecute
