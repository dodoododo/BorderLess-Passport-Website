const PlaceSuggestEdit = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "fsq_place_id": {
            "type": "string",
            "description": "A unique string identifier for a FSQ Place (formerly known as Venue ID). E.g., Foursquare HQ's fsq_id = 5a187743ccad6b307315e6fe."
          }
        },
        "required": [
          "fsq_place_id"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "dry_run": {
            "type": "boolean",
            "default": true,
            "description": "If true, return the expected result without actually submitting the suggestion. Useful for testing.\n**Note this defaults to *false* in all cases EXCEPT when calling through this docs page.**"
          },
          "latitude": {
            "type": "number",
            "format": "double",
            "description": "The proposed new value for the latitude at which the place should be located (e.g., 41.8781)."
          },
          "longitude": {
            "type": "number",
            "format": "double",
            "description": "The proposed new value for the longitude at which the place should be located (e.g., -87.6298)."
          },
          "menu": {
            "type": "string",
            "description": "The proposed new value for the url where the menu of the place can be found."
          },
          "facebook_url": {
            "type": "string",
            "description": "The proposed new value for the url for this place's Facebook Page."
          },
          "parent_id": {
            "type": "string",
            "description": "The proposed new value if the place is a subvenue of a larger place (such as a coffee shop within a Target), set this attribute to the ID of the parent place. Set to \"\" to remove parent."
          },
          "is_private_place": {
            "type": "boolean",
            "description": "The proposed new value for whether the place is a private place. If true, the place will be marked as private. Otherwise, it will be marked as public."
          },
          "hours": {
            "type": "string",
            "description": "The proposed new value for the hours for the venue, as a semi-colon separated list of open segments and named segments (e.g., brunch or happy hour). Open segments are formatted as day,start,end. Named segments additionally have a label, formatted as day,start,end,label. Days are formatted as integers with Monday = 1,...,Sunday = 7. Start and End are formatted as [+]HHMM format. Use 24 hour format (no colon), prefix with 0 for HH or MM less than 10. Use '+' prefix, i.e., +0230 to represent 2:30 am past midnight into the following day. To indicate that a venue is open 24/7, send this value with the hours attribute: 1,0000,2400;2,0000,2400;3,0000,2400;4,0000,2400;5,0000,2400;6,0000,2400;7,0000,2400"
          },
          "name": {
            "type": "string",
            "description": "The proposed new value for the name of the place."
          },
          "description": {
            "type": "string",
            "description": "The proposed new value for the freeform description of the place, up to 300 characters."
          },
          "tel": {
            "type": "string",
            "description": "The proposed new value for the phone number of the place."
          },
          "instagram": {
            "type": "string",
            "description": "The proposed new value for the instagram handle of the place."
          },
          "twitter": {
            "type": "string",
            "description": "The proposed new value for the twitter handle of the place."
          },
          "website": {
            "type": "string",
            "description": "The proposed new value for the url of the homepage of the place."
          },
          "address": {
            "type": "string",
            "description": "The proposed new value for the address of the place."
          },
          "locality": {
            "type": "string",
            "description": "The proposed new value for the name of the locality (city) where this place is."
          },
          "region": {
            "type": "string",
            "description": "The proposed new value for the nearest state or province to the place."
          },
          "postcode": {
            "type": "string",
            "description": "The proposed new value for the zip or postal code for the place."
          },
          "country_code": {
            "type": "string",
            "description": "The proposed new 2-digit country code where the place is located (e.g. US)."
          },
          "add_attributes": {
            "type": "string",
            "description": "A comma-separated list of attribute keys to add or enable for the venue. Possible values are: {atm, reservations, offers_delivery, parking, outdoor_seating, restroom, credit_cards, wifi}."
          },
          "remove_attributes": {
            "type": "string",
            "description": "A comma-separated list of attribute keys to remove or disable from the venue. Possible values are: {atm, reservations, offers_delivery, parking, outdoor_seating, restroom, credit_cards, wifi}."
          },
          "add_fsq_category_ids": {
            "type": "string",
            "description": "Add category IDs. Supports multiple Category IDs, separated by commas.\n\nFor a complete list of Foursquare Category IDs, refer to the <a href=\"https://docs.foursquare.com/data-products/docs/categories\" target=\"blank\">Category Taxonomy</a> page. [This endpoint prefers the 5-integer style id, but can accept the BSON style id]"
          },
          "remove_fsq_category_ids": {
            "type": "string",
            "description": "Remove category IDs. Supports multiple Category IDs, separated by commas.\n\nFor a complete list of Foursquare Category IDs, refer to the <a href=\"https://docs.foursquare.com/data-products/docs/categories\" target=\"blank\">Category Taxonomy</a> page. [This endpoint prefers the 5-integer style id, but can accept the BSON style id]"
          },
          "primary_fsq_category_id": {
            "type": "string",
            "description": "Change the primary category ID\n\nFor a complete list of Foursquare Category IDs, refer to the <a href=\"https://docs.foursquare.com/data-products/docs/categories\" target=\"blank\">Category Taxonomy</a> page. [This endpoint prefers the 5-integer style id, but can accept the BSON style id]"
          },
          "add_fsq_chain_ids": {
            "type": "string",
            "description": "Add chain IDs."
          },
          "remove_fsq_chain_ids": {
            "type": "string",
            "description": "Remove Foursquare chain IDs."
          },
          "primary_fsq_chain_id": {
            "type": "string",
            "description": "Change the primary chain ID."
          },
          "unset_fields": {
            "type": "string",
            "description": "Fields to unset. Supports multiple fields, separated by commas. Possible values are: <ul><li>menu (default)</li><li>facebook_url</li><li>description</li><li>address</li><li>tel</li><li>twitter</li><li>website</li><li>fsq_chain_ids</li><li>hours</li></ul>"
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
        "suggested_edits": {
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
export default PlaceSuggestEdit
