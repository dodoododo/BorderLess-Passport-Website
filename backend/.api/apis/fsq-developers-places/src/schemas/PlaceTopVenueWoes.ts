const PlaceTopVenueWoes = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "near": {
            "type": "string",
            "description": "The name of the location to search near"
          },
          "ne": {
            "type": "string",
            "description": "The north-east corner of the bounding box to search within"
          },
          "sw": {
            "type": "string",
            "description": "The south-west corner of the bounding box to search within"
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
        "venues": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "object",
            "properties": {
              "fsq_place_id": {
                "type": "string"
              },
              "venue_name": {
                "type": "string"
              },
              "location": {
                "type": "object",
                "properties": {
                  "address": {
                    "type": "string"
                  },
                  "locality": {
                    "type": "string"
                  },
                  "region": {
                    "type": "string"
                  },
                  "postcode": {
                    "type": "string"
                  },
                  "admin_region": {
                    "type": "string"
                  },
                  "post_town": {
                    "type": "string"
                  },
                  "po_box": {
                    "type": "string"
                  },
                  "country": {
                    "type": "string"
                  },
                  "formatted_address": {
                    "type": "string"
                  }
                }
              },
              "woe_types": {
                "uniqueItems": true,
                "type": "array",
                "properties": {
                  "traversable_again": {
                    "type": "boolean"
                  }
                },
                "items": {
                  "type": "string"
                }
              },
              "woe_count": {
                "type": "integer",
                "format": "int32"
              },
              "woes": {
                "type": "array",
                "properties": {
                  "traversable_again": {
                    "type": "boolean"
                  }
                },
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "fsq_place_id": {
                      "type": "string"
                    },
                    "suggested_edit_type": {
                      "type": "string"
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "resolved_time": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "rolled_back": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "status": {
                      "type": "string"
                    },
                    "created_fsq_place_id": {
                      "type": "string"
                    },
                    "matched_fsq_place_id": {
                      "type": "string"
                    }
                  }
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
export default PlaceTopVenueWoes
