const Autocomplete = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "A search term to be applied against titles. Must be at least 3 characters long."
          },
          "ll": {
            "type": "string",
            "description": "The latitude/longitude around which you wish to retrieve place information. Specified as latitude,longitude (e.g., ll=41.8781,-87.6298). If you do not specify ll, the server will attempt to retrieve the IP address from the request, and geolocate that IP address."
          },
          "radius": {
            "type": "integer",
            "format": "int32",
            "description": "Defines the distance (in meters) within which to return place results. Setting a radius biases the results to the indicated area, but may not fully restrict results to that specified area. If not provided, default radius is set to 5000 meters."
          },
          "types": {
            "type": "string",
            "description": "The types of results to return; any combination of place, search, and/or geo.If no types are specified, all types will be returned."
          },
          "bias": {
            "type": "string",
            "description": "Bias the autocomplete results by a specific type; one of place, search, or geo."
          },
          "session_token": {
            "type": "string",
            "description": "A user-generated token to to group the user's query and the user's selected result into a discrete session for billing purposes. Learn more about [session tokens](https://docs.foursquare.com/reference/session-tokens).\n\n*If the session_token parameter is omitted, the session is charged per keystroke/request.*"
          },
          "limit": {
            "maximum": 50,
            "minimum": 1,
            "type": "integer",
            "format": "int32",
            "description": "The number of results to return, up to 50. Defaults to 10."
          }
        },
        "required": [
          "query"
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
        "results": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "text": {
                "type": "object",
                "properties": {
                  "primary": {
                    "type": "string"
                  },
                  "secondary": {
                    "type": "string"
                  },
                  "highlight": {
                    "type": "array",
                    "properties": {
                      "traversable_again": {
                        "type": "boolean"
                      }
                    },
                    "items": {
                      "type": "object",
                      "properties": {
                        "start": {
                          "type": "integer",
                          "format": "int32"
                        },
                        "length": {
                          "type": "integer",
                          "format": "int32"
                        }
                      }
                    }
                  }
                }
              },
              "icon": {
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
              },
              "link": {
                "type": "string"
              },
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
              "search": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string"
                  },
                  "category": {
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
                  },
                  "chain": {
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
                }
              },
              "geo": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "center": {
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
                  },
                  "bounds": {
                    "type": "object",
                    "properties": {
                      "ne": {
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
                      },
                      "sw": {
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
                    }
                  },
                  "cc": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  }
                }
              },
              "debug": {
                "type": "object",
                "properties": {
                  "score": {
                    "type": "integer",
                    "format": "int32"
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
export default Autocomplete
