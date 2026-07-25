const PlaceMatch = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the place to match."
          },
          "address": {
            "type": "string",
            "description": "Street address of the place to match (e.g. 1060 W Addison St)."
          },
          "city": {
            "type": "string",
            "description": "City, or Locality, where the place is located (e.g. Chicago)."
          },
          "state": {
            "type": "string",
            "description": "State, or Region, where the place is located (e.g. Illinois)."
          },
          "postal_code": {
            "type": "string",
            "description": "The postal code for the address where the place is located (e.g. 60613)."
          },
          "cc": {
            "type": "string",
            "description": "The 2-digit country code where the place is located (e.g. US). Only English-speaking countries currently supported."
          },
          "ll": {
            "type": "string",
            "description": "The latitude/longitude of the venue location. This must be specified as latitude,longitude (e.g., ll=41.9484,-87.6553)."
          },
          "fields": {
            "type": "string",
            "description": "Indicate which fields to return in the response, separated by commas. If no fields are specified, all <a href=\"response-fields#places-pro\" target=\"_blank\">Pro Fields</a> are returned by default. \n\nFor a complete list of returnable fields, refer to the <a href=\"response-fields\" target=\"_blank\">Places Response Fields</a> page."
          }
        },
        "required": [
          "name",
          "address",
          "city",
          "cc"
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
        "place": {
          "type": "object",
          "properties": {
            "fsq_place_id": {
              "type": "string"
            },
            "latitude": {
              "type": "number",
              "format": "double"
            },
            "longitude": {
              "type": "number",
              "format": "double"
            },
            "categories": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "fsq_category_id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "short_name": {
                    "type": "string"
                  },
                  "plural_name": {
                    "type": "string"
                  },
                  "icon": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "created_at": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "prefix": {
                        "type": "string"
                      },
                      "suffix": {
                        "type": "string"
                      },
                      "width": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "height": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "classifications": {
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
                      "tip": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "text": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "photo": {},
                          "lang": {
                            "type": "string"
                          },
                          "agree_count": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "disagree_count": {
                            "type": "integer",
                            "format": "int32"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "chains": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "fsq_chain_id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "logo": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "created_at": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "prefix": {
                        "type": "string"
                      },
                      "suffix": {
                        "type": "string"
                      },
                      "width": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "height": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "classifications": {
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
                      "tip": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "text": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "photo": {},
                          "lang": {
                            "type": "string"
                          },
                          "agree_count": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "disagree_count": {
                            "type": "integer",
                            "format": "int32"
                          }
                        }
                      }
                    }
                  },
                  "parent_id": {
                    "type": "string"
                  }
                }
              }
            },
            "date_closed": {
              "type": "string",
              "format": "date"
            },
            "date_created": {
              "type": "string"
            },
            "date_refreshed": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "distance": {
              "type": "integer",
              "format": "int32"
            },
            "email": {
              "type": "string"
            },
            "extended_location": {
              "type": "object",
              "properties": {
                "dma": {
                  "type": "string"
                },
                "census_block_id": {
                  "type": "string"
                }
              }
            },
            "attributes": {
              "type": "object",
              "properties": {
                "restroom": {
                  "type": "boolean"
                },
                "outdoor_seating": {
                  "type": "boolean"
                },
                "atm": {
                  "type": "boolean"
                },
                "has_parking": {
                  "type": "boolean"
                },
                "wifi": {
                  "type": "string"
                },
                "delivery": {
                  "type": "boolean"
                },
                "reservations": {
                  "type": "boolean"
                },
                "takes_credit_card": {
                  "type": "boolean"
                }
              }
            },
            "hours": {
              "type": "object",
              "properties": {
                "display": {
                  "type": "string"
                },
                "is_local_holiday": {
                  "type": "boolean"
                },
                "open_now": {
                  "type": "boolean"
                },
                "regular": {
                  "type": "array",
                  "properties": {
                    "traversable_again": {
                      "type": "boolean"
                    }
                  },
                  "items": {
                    "type": "object",
                    "properties": {
                      "close": {
                        "type": "string"
                      },
                      "day": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "open": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "hours_popular": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "close": {
                    "type": "string"
                  },
                  "day": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "open": {
                    "type": "string"
                  }
                }
              }
            },
            "link": {
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
            "menu": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "photos": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "fsq_photo_id": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "prefix": {
                    "type": "string"
                  },
                  "suffix": {
                    "type": "string"
                  },
                  "width": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "height": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "classifications": {
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
                  "tip": {
                    "type": "object",
                    "properties": {
                      "fsq_tip_id": {
                        "type": "string"
                      },
                      "created_at": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "text": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      },
                      "photo": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "prefix": {
                            "type": "string"
                          },
                          "suffix": {
                            "type": "string"
                          },
                          "width": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "height": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "classifications": {
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
                          "tip": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "text": {
                                "type": "string"
                              },
                              "url": {
                                "type": "string"
                              },
                              "photo": {},
                              "lang": {
                                "type": "string"
                              },
                              "agree_count": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "disagree_count": {
                                "type": "integer",
                                "format": "int32"
                              }
                            }
                          }
                        }
                      },
                      "lang": {
                        "type": "string"
                      },
                      "agree_count": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "disagree_count": {
                        "type": "integer",
                        "format": "int32"
                      }
                    }
                  }
                }
              }
            },
            "place_actions": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "action": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "provider_id": {
                    "type": "string"
                  }
                }
              }
            },
            "popularity": {
              "type": "number",
              "format": "double"
            },
            "placemaker_url": {
              "type": "string"
            },
            "price": {
              "type": "integer",
              "format": "int32"
            },
            "rating": {
              "type": "number",
              "format": "double"
            },
            "related_places": {
              "type": "object",
              "properties": {
                "parent": {
                  "type": "object",
                  "properties": {
                    "fsq_place_id": {
                      "type": "string"
                    },
                    "latitude": {
                      "type": "number",
                      "format": "double"
                    },
                    "longitude": {
                      "type": "number",
                      "format": "double"
                    },
                    "categories": {
                      "type": "array",
                      "properties": {
                        "traversable_again": {
                          "type": "boolean"
                        }
                      },
                      "items": {
                        "type": "object",
                        "properties": {
                          "fsq_category_id": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          },
                          "short_name": {
                            "type": "string"
                          },
                          "plural_name": {
                            "type": "string"
                          },
                          "icon": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "prefix": {
                                "type": "string"
                              },
                              "suffix": {
                                "type": "string"
                              },
                              "width": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "height": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "classifications": {
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
                              "tip": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "text": {
                                    "type": "string"
                                  },
                                  "url": {
                                    "type": "string"
                                  },
                                  "photo": {},
                                  "lang": {
                                    "type": "string"
                                  },
                                  "agree_count": {
                                    "type": "integer",
                                    "format": "int32"
                                  },
                                  "disagree_count": {
                                    "type": "integer",
                                    "format": "int32"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "chains": {
                      "type": "array",
                      "properties": {
                        "traversable_again": {
                          "type": "boolean"
                        }
                      },
                      "items": {
                        "type": "object",
                        "properties": {
                          "fsq_chain_id": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          },
                          "logo": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "prefix": {
                                "type": "string"
                              },
                              "suffix": {
                                "type": "string"
                              },
                              "width": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "height": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "classifications": {
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
                              "tip": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string",
                                    "format": "date-time"
                                  },
                                  "text": {
                                    "type": "string"
                                  },
                                  "url": {
                                    "type": "string"
                                  },
                                  "photo": {},
                                  "lang": {
                                    "type": "string"
                                  },
                                  "agree_count": {
                                    "type": "integer",
                                    "format": "int32"
                                  },
                                  "disagree_count": {
                                    "type": "integer",
                                    "format": "int32"
                                  }
                                }
                              }
                            }
                          },
                          "parent_id": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "date_closed": {
                      "type": "string",
                      "format": "date"
                    },
                    "date_created": {
                      "type": "string"
                    },
                    "date_refreshed": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "distance": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "email": {
                      "type": "string"
                    },
                    "extended_location": {
                      "type": "object",
                      "properties": {
                        "dma": {
                          "type": "string"
                        },
                        "census_block_id": {
                          "type": "string"
                        }
                      }
                    },
                    "attributes": {
                      "type": "object",
                      "properties": {
                        "restroom": {
                          "type": "boolean"
                        },
                        "outdoor_seating": {
                          "type": "boolean"
                        },
                        "atm": {
                          "type": "boolean"
                        },
                        "has_parking": {
                          "type": "boolean"
                        },
                        "wifi": {
                          "type": "string"
                        },
                        "delivery": {
                          "type": "boolean"
                        },
                        "reservations": {
                          "type": "boolean"
                        },
                        "takes_credit_card": {
                          "type": "boolean"
                        }
                      }
                    },
                    "hours": {
                      "type": "object",
                      "properties": {
                        "display": {
                          "type": "string"
                        },
                        "is_local_holiday": {
                          "type": "boolean"
                        },
                        "open_now": {
                          "type": "boolean"
                        },
                        "regular": {
                          "type": "array",
                          "properties": {
                            "traversable_again": {
                              "type": "boolean"
                            }
                          },
                          "items": {
                            "type": "object",
                            "properties": {
                              "close": {
                                "type": "string"
                              },
                              "day": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "open": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    },
                    "hours_popular": {
                      "type": "array",
                      "properties": {
                        "traversable_again": {
                          "type": "boolean"
                        }
                      },
                      "items": {
                        "type": "object",
                        "properties": {
                          "close": {
                            "type": "string"
                          },
                          "day": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "open": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "link": {
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
                    "menu": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "photos": {
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
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "prefix": {
                            "type": "string"
                          },
                          "suffix": {
                            "type": "string"
                          },
                          "width": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "height": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "tip": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "text": {
                                "type": "string"
                              },
                              "url": {
                                "type": "string"
                              },
                              "photo": {},
                              "lang": {
                                "type": "string"
                              },
                              "agree_count": {
                                "type": "integer",
                                "format": "int32"
                              },
                              "disagree_count": {
                                "type": "integer",
                                "format": "int32"
                              }
                            }
                          }
                        }
                      }
                    },
                    "place_actions": {
                      "type": "array",
                      "properties": {
                        "traversable_again": {
                          "type": "boolean"
                        }
                      },
                      "items": {
                        "type": "object",
                        "properties": {
                          "action": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "provider_id": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "popularity": {
                      "type": "number",
                      "format": "double"
                    },
                    "placemaker_url": {
                      "type": "string"
                    },
                    "price": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "rating": {
                      "type": "number",
                      "format": "double"
                    },
                    "social_media": {
                      "type": "object",
                      "properties": {
                        "facebook_id": {
                          "type": "string"
                        },
                        "instagram": {
                          "type": "string"
                        },
                        "twitter": {
                          "type": "string"
                        }
                      }
                    },
                    "stats": {
                      "type": "object",
                      "properties": {
                        "total_photos": {
                          "type": "integer",
                          "format": "int32"
                        },
                        "total_ratings": {
                          "type": "integer",
                          "format": "int64"
                        },
                        "total_tips": {
                          "type": "integer",
                          "format": "int32"
                        }
                      }
                    },
                    "store_id": {
                      "type": "string"
                    },
                    "tastes": {
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
                    "tel": {
                      "type": "string"
                    },
                    "tips": {
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
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "text": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "photo": {},
                          "lang": {
                            "type": "string"
                          },
                          "agree_count": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "disagree_count": {
                            "type": "integer",
                            "format": "int32"
                          }
                        }
                      }
                    },
                    "website": {
                      "type": "string"
                    }
                  }
                },
                "children": {
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
                      "latitude": {
                        "type": "number",
                        "format": "double"
                      },
                      "longitude": {
                        "type": "number",
                        "format": "double"
                      },
                      "categories": {
                        "type": "array",
                        "properties": {
                          "traversable_again": {
                            "type": "boolean"
                          }
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "fsq_category_id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "short_name": {
                              "type": "string"
                            },
                            "plural_name": {
                              "type": "string"
                            },
                            "icon": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "created_at": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "prefix": {
                                  "type": "string"
                                },
                                "suffix": {
                                  "type": "string"
                                },
                                "width": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "height": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "classifications": {
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
                                "tip": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "created_at": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "text": {
                                      "type": "string"
                                    },
                                    "url": {
                                      "type": "string"
                                    },
                                    "photo": {},
                                    "lang": {
                                      "type": "string"
                                    },
                                    "agree_count": {
                                      "type": "integer",
                                      "format": "int32"
                                    },
                                    "disagree_count": {
                                      "type": "integer",
                                      "format": "int32"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "chains": {
                        "type": "array",
                        "properties": {
                          "traversable_again": {
                            "type": "boolean"
                          }
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "fsq_chain_id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "logo": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "created_at": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "prefix": {
                                  "type": "string"
                                },
                                "suffix": {
                                  "type": "string"
                                },
                                "width": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "height": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "classifications": {
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
                                "tip": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "created_at": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "text": {
                                      "type": "string"
                                    },
                                    "url": {
                                      "type": "string"
                                    },
                                    "photo": {},
                                    "lang": {
                                      "type": "string"
                                    },
                                    "agree_count": {
                                      "type": "integer",
                                      "format": "int32"
                                    },
                                    "disagree_count": {
                                      "type": "integer",
                                      "format": "int32"
                                    }
                                  }
                                }
                              }
                            },
                            "parent_id": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "date_closed": {
                        "type": "string",
                        "format": "date"
                      },
                      "date_created": {
                        "type": "string"
                      },
                      "date_refreshed": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "distance": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "email": {
                        "type": "string"
                      },
                      "extended_location": {
                        "type": "object",
                        "properties": {
                          "dma": {
                            "type": "string"
                          },
                          "census_block_id": {
                            "type": "string"
                          }
                        }
                      },
                      "attributes": {
                        "type": "object",
                        "properties": {
                          "restroom": {
                            "type": "boolean"
                          },
                          "outdoor_seating": {
                            "type": "boolean"
                          },
                          "atm": {
                            "type": "boolean"
                          },
                          "has_parking": {
                            "type": "boolean"
                          },
                          "wifi": {
                            "type": "string"
                          },
                          "delivery": {
                            "type": "boolean"
                          },
                          "reservations": {
                            "type": "boolean"
                          },
                          "takes_credit_card": {
                            "type": "boolean"
                          }
                        }
                      },
                      "hours": {
                        "type": "object",
                        "properties": {
                          "display": {
                            "type": "string"
                          },
                          "is_local_holiday": {
                            "type": "boolean"
                          },
                          "open_now": {
                            "type": "boolean"
                          },
                          "regular": {
                            "type": "array",
                            "properties": {
                              "traversable_again": {
                                "type": "boolean"
                              }
                            },
                            "items": {
                              "type": "object",
                              "properties": {
                                "close": {
                                  "type": "string"
                                },
                                "day": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "open": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      },
                      "hours_popular": {
                        "type": "array",
                        "properties": {
                          "traversable_again": {
                            "type": "boolean"
                          }
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "close": {
                              "type": "string"
                            },
                            "day": {
                              "type": "integer",
                              "format": "int32"
                            },
                            "open": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "link": {
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
                      "menu": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "photos": {
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
                            "created_at": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "prefix": {
                              "type": "string"
                            },
                            "suffix": {
                              "type": "string"
                            },
                            "width": {
                              "type": "integer",
                              "format": "int32"
                            },
                            "height": {
                              "type": "integer",
                              "format": "int32"
                            },
                            "tip": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "created_at": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "url": {
                                  "type": "string"
                                },
                                "photo": {},
                                "lang": {
                                  "type": "string"
                                },
                                "agree_count": {
                                  "type": "integer",
                                  "format": "int32"
                                },
                                "disagree_count": {
                                  "type": "integer",
                                  "format": "int32"
                                }
                              }
                            }
                          }
                        }
                      },
                      "place_actions": {
                        "type": "array",
                        "properties": {
                          "traversable_again": {
                            "type": "boolean"
                          }
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "action": {
                              "type": "string"
                            },
                            "url": {
                              "type": "string"
                            },
                            "provider_id": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "popularity": {
                        "type": "number",
                        "format": "double"
                      },
                      "placemaker_url": {
                        "type": "string"
                      },
                      "price": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "rating": {
                        "type": "number",
                        "format": "double"
                      },
                      "social_media": {
                        "type": "object",
                        "properties": {
                          "facebook_id": {
                            "type": "string"
                          },
                          "instagram": {
                            "type": "string"
                          },
                          "twitter": {
                            "type": "string"
                          }
                        }
                      },
                      "stats": {
                        "type": "object",
                        "properties": {
                          "total_photos": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "total_ratings": {
                            "type": "integer",
                            "format": "int64"
                          },
                          "total_tips": {
                            "type": "integer",
                            "format": "int32"
                          }
                        }
                      },
                      "store_id": {
                        "type": "string"
                      },
                      "tastes": {
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
                      "tel": {
                        "type": "string"
                      },
                      "tips": {
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
                            "created_at": {
                              "type": "string",
                              "format": "date-time"
                            },
                            "text": {
                              "type": "string"
                            },
                            "url": {
                              "type": "string"
                            },
                            "photo": {},
                            "lang": {
                              "type": "string"
                            },
                            "agree_count": {
                              "type": "integer",
                              "format": "int32"
                            },
                            "disagree_count": {
                              "type": "integer",
                              "format": "int32"
                            }
                          }
                        }
                      },
                      "website": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "social_media": {
              "type": "object",
              "properties": {
                "facebook_id": {
                  "type": "string"
                },
                "instagram": {
                  "type": "string"
                },
                "twitter": {
                  "type": "string"
                }
              }
            },
            "stats": {
              "type": "object",
              "properties": {
                "total_photos": {
                  "type": "integer",
                  "format": "int32"
                },
                "total_ratings": {
                  "type": "integer",
                  "format": "int64"
                },
                "total_tips": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            },
            "store_id": {
              "type": "string"
            },
            "tastes": {
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
            "tel": {
              "type": "string"
            },
            "tips": {
              "type": "array",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "items": {
                "type": "object",
                "properties": {
                  "fsq_tip_id": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "text": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "photo": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "created_at": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "prefix": {
                        "type": "string"
                      },
                      "suffix": {
                        "type": "string"
                      },
                      "width": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "height": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "classifications": {
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
                      "tip": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "text": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "photo": {},
                          "lang": {
                            "type": "string"
                          },
                          "agree_count": {
                            "type": "integer",
                            "format": "int32"
                          },
                          "disagree_count": {
                            "type": "integer",
                            "format": "int32"
                          }
                        }
                      }
                    }
                  },
                  "lang": {
                    "type": "string"
                  },
                  "agree_count": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "disagree_count": {
                    "type": "integer",
                    "format": "int32"
                  }
                }
              }
            },
            "unresolved_flags": {
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
            "veracity_rating": {
              "type": "object",
              "additionalProperties": true
            },
            "website": {
              "type": "string"
            },
            "plugins": {
              "type": "object",
              "properties": {
                "traversable_again": {
                  "type": "boolean"
                }
              },
              "additionalProperties": {
                "type": "object",
                "additionalProperties": true
              }
            }
          }
        },
        "match_score": {
          "type": "number",
          "format": "double"
        },
        "context": {
          "type": "object",
          "properties": {
            "latitude": {
              "type": "number",
              "format": "double"
            },
            "longitude": {
              "type": "number",
              "format": "double"
            }
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlaceMatch
