const PlacesSuggestPlace = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The proposed value for the name of the new place."
          },
          "categories": {
            "type": "string",
            "description": "Categories to search for. Supports multiple Category IDs, separated by commas.\n\nFor a complete list of Foursquare Category IDs, refer to the <a href=\"https://docs.foursquare.com/data-products/docs/categories\" target=\"blank\">Category Taxonomy</a> page."
          },
          "address": {
            "type": "string",
            "description": "The proposed value for the address of the new place."
          },
          "locality": {
            "type": "string",
            "description": "The proposed value for the name of the locality (city) where this new place is."
          },
          "region": {
            "type": "string",
            "description": "The proposed value for the nearest state or province to the new place."
          },
          "postcode": {
            "type": "string",
            "description": "The value for the zip or postal code for the new place."
          },
          "country_code": {
            "type": "string",
            "description": "The 2-digit country code where the place is located (e.g. US)."
          },
          "latitude": {
            "type": "number",
            "format": "double",
            "description": "The proposed value for the latitude at which the new place should be located (e.g., 41.8781)."
          },
          "longitude": {
            "type": "number",
            "format": "double",
            "description": "The proposed value for the longitude at which the new place should be located (e.g., -87.6298)."
          },
          "chains": {
            "type": "string",
            "description": "The proposed chain ids to be assosciated with this new place"
          },
          "parent_id": {
            "type": "string",
            "description": "The proposed value if the new place is a subvenue of a larger place (such as a coffee shop within a Target), set this attribute to the ID of the parent place."
          },
          "is_private_place": {
            "type": "boolean",
            "description": "If true, the new place will be marked as private."
          },
          "tel": {
            "type": "string",
            "description": "The proposed new value for the phone number of the place."
          },
          "website": {
            "type": "string",
            "description": "The proposed value for the url of the homepage of the new place."
          },
          "email": {
            "type": "string",
            "description": "The proposed value for the email address for this new place"
          },
          "facebook_url": {
            "type": "string",
            "description": "The proposed value for the url for this new place's Facebook Page."
          },
          "instagram": {
            "type": "string",
            "description": "The proposed value for the instagram handle for this new place"
          },
          "twitter": {
            "type": "string",
            "description": "The proposed value for the twitter handle of the new place."
          },
          "hours": {
            "type": "string",
            "description": "The proposed value for the hours for the new venue, as a semi-colon separated list of open segments and named segments (e.g., brunch or happy hour). Open segments are formatted as day,start,end. Named segments additionally have a label, formatted as day,start,end,label. Days are formatted as integers with Monday = 1,...,Sunday = 7. Start and End are formatted as [+]HHMM format. Use 24 hour format (no colon), prefix with 0 for HH or MM less than 10. Use '+' prefix, i.e., +0230 to represent 2:30 am past midnight into the following day. To indicate that a venue is open 24/7, send this value with the hours attribute: 1,0000,2400;2,0000,2400;3,0000,2400;4,0000,2400;5,0000,2400;6,0000,2400;7,0000,2400"
          },
          "attributes": {
            "type": "string",
            "description": "Comma seperated list that represents the attributes that the new place has. Possible values are: {atm, reservation, offers_delivery, parking, outdoor_seating, restroom, credit_cards, wifi}."
          },
          "dry_run": {
            "type": "boolean",
            "default": true,
            "description": "If true, return the expected result without actually submitting the suggestion. Useful for testing.\n**Note this defaults to *false* in all cases EXCEPT when calling through this docs page.**"
          }
        },
        "required": [
          "name"
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
        "new_place_suggestion": {
          "type": "object",
          "properties": {
            "id": {
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
            "status": {
              "type": "string"
            }
          }
        },
        "matched_fsq_place": {
          "type": "object",
          "properties": {
            "fsq_place_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
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
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlacesSuggestPlace
