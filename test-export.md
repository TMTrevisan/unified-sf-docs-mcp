# Filtered Export (15 pages)

---

# Intelligent Content
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_intelligent_content.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_intelligent_content.htm)

# Intelligent Content\n\nIntelligent Content facilitates marketing strategies by enabling direct and interactive communications with healthcare professionals (HCPs). Sales and medical teams can deliver personalized presentations based on real-time feedback and analytics, enhancing the impact of their interactions. By continuously refining and optimizing marketing messages and strategies through data collection and analysis, Intelligent Content ensures that they are relevant and responsive to HCP needs and preferences. Intelligent Content capabilities include analytics and optimized user interfaces, offering a comprehensive solution for targeted content delivery in both planned and unplanned presentations.\n\n![images/lsc_general_events_data_model.png](https://developer.salesforce.com/docs/resources/img/en-us/260.0?doc_id=dev_guides%2Flife_sciences%2Fimages%2Flsc_intelligent_content_data_model.png&folder=life_sciences_dev_guide)\n\n

For more details and a larger image, visit the [Data Model Gallery](https://developer.salesforce.com/docs/platform/data-models/guide/intelligent-content.html "HTML (New Window)").\n\n

-   **[Presentation](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentation.htm)**  
    Represents a collection of presentations, each with various attributes such as activation dates, the ability to be sent by email, associated tags, and gestures. This object is available in API version 65.0 and later.
-   **[PresentationClickStrmEntry](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationclickstrmentry.htm)**  
    Represents the collection of clickstream data captured while the presentation is being used or shown across different forums. This object is available in API version 65.0 and later.
-   **[PresentationForum](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationforum.htm)**  
    Represents the details of the forums (call, meetings, order) where the presentation was presented. This object is available in API version 65.0 and later.
-   **[PresentationLinkedPage](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationlinkedpage.htm)**  
    Represents the connection between a presentation and its associated presentation pages. This object is available in API version 65.0 and later.
-   **[PresentationPage](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpage.htm)**  
    Represents a collection of pages that can be used within a presentation. Each page can contain multiple slides. Pages can be reused across different presentations. This object is available in API version 65.0 and later.
-   **[PresentationPageProduct](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpageproduct.htm)**  
    Represents the link between a presentation page and a product, and may also include a connection to related product message (product guidance). This object is available in API version 65.0 and later.
-   **[PresentationPartyAccess](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpartyaccess.htm)**  
    Represents the access-sharing details of a presentation with a healthcare professional, including an expiration date for that access. This object is available in API version 65.0 and later.\n\n

---

# Presentation
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentation.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentation.htm)

# Presentation\n\nRepresents a collection of presentations, each with various attributes such as activation dates, the ability to be sent by email, associated tags, and gestures. This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| ActivationDate | 
Type\n\ndate\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe date from which active presentations become available to sales representatives. If the field is empty, the start date limit is not applied to the presentation.\n\n\n\n |
| CanSendByEmail | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nDefines whether the presentation can be sent via email.\n\nThe default value is false.\n\n\n\n |
| DeactivationDate | \n\n

Type\n\ndate\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe end date limit during which active presentations are available to sales representatives. If the field is empty, the end date limit isn't applied to the presentation.\n\n\n\n |
| IsCustom | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nIdentifies whether the presentation was created by a user.\n\nThe default value is false.\n\n\n\n |
| IsDoubleTapZoomEnabled | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nIndicates if the double-tap zoom feature is activated for the presentation. Available only for html presentations.\n\nThe default value is false.\n\n\n\n |
| IsPDFIncluded | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\n

Indicates whether the presentation includes a PDF file, which can be sent as an attachment via email. If set to true, it means that the presentation contains PDF files ready for email delivery.\n\nThe default value is false.\n\n\n\n |
| IsPinchZoomEnabled | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nEnables or disables the pinch-to-zoom functionality in the presentation.\n\nThe default value is false.\n\n\n\n |
| IsPresentationLocked | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nIndicates if the presentation has been locked by an admin, meaning it can no longer be edited.\n\nThe default value is false.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n

|
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Sort, Update\n\nDescription\n\nRequired. Name of the presentation.\n\n\n\n |
| OwnerId | \n\nType\n\nreference\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nID of the owner or creator of this object.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nOwner\n\nRefers To\n\nGroup, User\n\n\n\n |
| PlayerGestureSectionSide | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Nillable, Restricted picklist, Sort, Update\n\nDescription\n\nThe gesture with which sales representatives open the Presentation Player menu.\n\n

Possible values are:\n\n-   SwipeDown
-   SwipeUp
-   TapBottom
-   TapTop\n\n\n\n\n\n |
| PublicDisclaimerContentName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the public content that will be accessible during remote interactions and tied to the presentation. This content is typically linked to important public documents, such as product information or legal disclaimers, which the healthcare professional can view through their browser.\n\n\n\n |
| PublicDisclaimerContentUrl | \n\nType\n\nurl\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe URL pointing to the public disclaimer.\n\n\n\n |
| ReactionSectionSide | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Nillable, Restricted picklist, Sort, Update\n\nDescription\n\nDetermines the location of the sequence rating zone in the presentation player.\n\nPossible values are:\n\n-   Left
-   Right\n\n\n\n\n\n

|
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nAn external ID from the source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the source system for data integrations.\n\n\n\n |
| Status | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Restricted picklist, Sort, Update\n\nDescription\n\nRequired.\n\nPossible values are:\n\n-   Active
-   Deleted
-   Inactive\n\n\n\n\n\n |
| Type | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Nillable, Restricted picklist, Sort, Update\n\nDescription\n\nThe presentation file type.\n\nPossible values are:\n\n-   PDF
-   ZIP\n\n\n\n\n\n |
| Version | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA text field to store the presentation’s version.\n\n\n\n |\n\n

## Associated Objects\n\nThis object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n[PresentationFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n[PresentationHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

[PresentationShare](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_share.htm "StandardObjectNameShare is the model for all share objects associated with standard objects. These objects represent a sharing entry on the standard object.")\n\nSharing is available for the object.\n\n

---

# PresentationClickStrmEntry
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationclickstrmentry.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationclickstrmentry.htm)

# PresentationClickStrmEntry\n\nRepresents the collection of clickstream data captured while the presentation is being used or shown across different forums. This object is available in API version 65.0 and later.\n\nWhere possible, we changed noninclusive terms to align with our company value of Equality. We maintained certain terms to avoid any effect on customer implementations.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| AccountId | 
Type\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the account, identifying the account on which the call was made. This field links the call data to a specific account for tracking purposes.\n\nThis field is a relationship field.\n\nRelationship Name\n\nAccount\n\nRefers To\n\nAccount\n\n\n\n

|
| AccountLoginName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the guest attendee used to log in remotely, if applicable. Tracks guest users accessing the remote session.\n\n\n\n |
| ActualUsageDuration | \n\nType\n\ndouble\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nRecords the total time, in seconds, that the user (during a face-to-face interaction) or the attendee (in a remote session) spent on a slide.\n\n\n\n |
| AttendeeBrowser | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nIdentifies the web browser used by the attendee during a remote session.\n\n\n\n |
| AttendeeDeviceOs | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nSpecifies the operating system used by the attendee's device during a remote session.\n\n\n\n |
| AttendeeDeviceType | \n\nType\n\nstring\n\nProperties\n\n

Create, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nIndicates the type of device (smartphone, tablet, computer) used by the attendee during a remote session.\n\n\n\n |
| ContentName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the public content that was opened during a remote interaction and that is tied to the presentation. This content is typically linked to important public documents, such as product information or legal disclaimers, which the health care professional can view through their browser.\n\n\n\n |
| ContentPageIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nIdentifies the specific slide within a presentation page container (sequence).\n\n\n\n |
| ContentReaction | \n\nType\n\ndouble\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\n

Captures the reaction to the presentation page—positive (1), negative (-1), or neutral (0).\n\n\n\n |
| ContentUrl | \n\nType\n\nurl\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe public disclaimer URL of the presentation that was opened.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| MetricType | \n\nType\n\nstring\n\nProperties\n\nFilter, Group, Nillable, Sort\n\nDescription\n\n

Specifies the type of metric being collected from the clickstream, such as Tracking or Content Rating.\n\nThis field is a calculated field.\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nAutonumber, Defaulted on create, Filter, idLookup, Sort\n\nDescription\n\nRequired. An automatically generated unique identifier for the record, following the format, CSM-{00000000}.\n\n\n\n |
| PresentationFileContentName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the slide that the user viewed in the presentation page file.\n\n\n\n |
| PresentationId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort\n\nDescription\n\nRequired. A reference to the presentation, linking to the presentation on which clickstream data was captured.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentation\n\nRelationship Type\n\nMaster-detail\n\nRefers To\n\nPresentation (the master object)\n\n\n\n

|
| PresentationName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the presentation from which the clickstream data was captured.\n\n\n\n |
| PresentationPageContentVerId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the specific version of the presentation file that was viewed by the user.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentationPageContentVer\n\nRefers To\n\nContentVersion\n\n\n\n |
| PresentationPageId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the presentation page, identifying the specific page where the clickstream data was recorded.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentationPage\n\nRefers To\n\nPresentationPage\n\n\n\n |
| PresentationVersion | \n\nType\n\nstring\n\nProperties\n\n

Create, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe version of the presentation that was displayed during the session.\n\n\n\n |
| ProductGuidanceId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the Product Guidance object, linking a specific product message to a presentation page presented and the clickstream metric record.\n\nThis field is a relationship field.\n\nRelationship Name\n\nProductGuidance\n\nRefers To\n\nProductGuidance\n\n\n\n |
| ProductId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to both the Product2 and LSMarketableProduct objects, associating a product with the presentation page presented and the clickstream metric record.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nProduct\n\nRefers To\n\nLifeSciMarketableProduct, Product2\n\n\n\n |
| ProviderVisitDtlProductMsgId | \n\nType\n\n

reference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the detailing product message associated with the presentation page.\n\nThis field is a relationship field.\n\nRelationship Name\n\nProviderVisitDtlProductMsg\n\nRefers To\n\nProviderVisitDtlProductMsg\n\n\n\n |
| ProviderVisitId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the Provider Visit object, linking to the overall record of the visit (Call).\n\nThis field is a relationship field.\n\nRelationship Name\n\nProviderVisit\n\nRefers To\n\nProviderVisit\n\n\n\n |
| ProviderVisitPrdDetailingId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the Provider Visit Product Detailing object, linking to specific product information discussed during the visit.\n\nThis field is a relationship field.\n\nRelationship Name\n\n

ProviderVisitPrdDetailing\n\nRefers To\n\nProviderVisitProdDetailing\n\n\n\n |
| ProviderVisitType | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Nillable, Restricted picklist, Sort, Update\n\nDescription\n\nSpecifies the type of remote call.\n\nPossible values are:\n\n-   AdHocSession
-   RemoteCall
-   RemoteMeeting\n\n\n\n\n\n |
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nAn external ID from the source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the source system for data integrations.\n\n\n\n |
| UsageEndDateTime | \n\nType\n\ndateTime\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nThe exact date and time when the user left the slide. For remote sessions, captured at the attendee level, not at the user level.\n\n\n\n

|
| UsageStartDateTime | \n\nType\n\ndateTime\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nThe exact date and time when the user opened the slide. For remote sessions, captured at the attendee level, not at the user level.\n\n\n\n |
| VisitId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the associated visit where clickstream data was captured.\n\nThis field is a relationship field.\n\nRelationship Name\n\nVisit\n\nRefers To\n\nVisit\n\n\n\n |\n\n## Associated Objects\n\nThis object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n

[PresentationClickStrmEntryFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n[PresentationClickStrmEntryHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

---

# PresentationForum
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationforum.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationforum.htm)

# PresentationForum\n\nRepresents the details of the forums (call, meetings, order) where the presentation was presented. This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| ForumReferenceId | 
Type\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort, Update\n\nDescription\n\nRequired. A reference to either the visit or account record that represents the forum in which the presentation was delivered.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nForumReference\n\nRefers To\n\nAccount, Visit\n\n\n\n |
| Geolocation | \n\nType\n\nlocation\n\nProperties\n\nNillable\n\nDescription\n\nCaptures the geographical location where the presentation was opened.\n\n\n\n |
| GeolocationDateTime | \n\nType\n\ndateTime\n\nProperties\n\n

Create, Filter, Nillable, Sort, Update\n\nDescription\n\nThe date and time when the location was last successfully acquired.\n\n\n\n |
| GeolocationLatitude | \n\nType\n\ndouble\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nCaptures the geographical latitude where the presentation was opened.\n\n\n\n |
| GeolocationLongitude | \n\nType\n\ndouble\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nCaptures the geographical longitude where the presentation was opened.\n\n\n\n |
| GeolocationMissingReason | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Nillable, Restricted picklist, Sort, Update\n\nDescription\n\nSpecifies why the location could not be retrieved, with possible reasons.\n\nPossible values are:\n\n-   BadData
-   DeviceRestricted
-   Offline
-   UserRestricted\n\n\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\n

The timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nAutonumber, Defaulted on create, Filter, idLookup, Sort\n\nDescription\n\nRequired. A unique identifier for the record, automatically generated in the format PF-{0000000000}.\n\n\n\n |
| PresentationId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort\n\nDescription\n\nRequired. Indicates the reference to the presentation.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentation\n\nRelationship Type\n\nMaster-detail\n\nRefers To\n\nPresentation (the master object)\n\n\n\n

|
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nAn external ID from the source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the source system for data integrations.\n\n\n\n |\n\n## Associated Objects\n\nThis object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n[PresentationForumFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n

[PresentationForumHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

---

# PresentationLinkedPage
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationlinkedpage.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationlinkedpage.htm)

# PresentationLinkedPage\n\nRepresents the connection between a presentation and its associated presentation pages. This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| DisplayOrder | 
Type\n\nint\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nIndicates the order of the related presentation page within the overall presentation.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\n

The timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nAutonumber, Defaulted on create, Filter, idLookup, Sort\n\nDescription\n\nName of the presentation linked page.\n\n\n\n |
| OriginalPrstLinkedPageId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe source presentation linked page from which this presentation linked page is copied.\n\nThis field is a relationship field.\n\nRelationship Name\n\nOriginalPrstLinkedPage\n\nRefers To\n\nPresentationLinkedPage\n\n\n\n |
| PresentationId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort\n\nDescription\n\nRequired. Indicates the reference to the presentation.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentation\n\nRelationship Type\n\nMaster-detail\n\n

Refers To\n\nPresentation (the master object)\n\n\n\n |
| PresentationPageId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort, Update\n\nDescription\n\nRequired. Indicates the reference to the presentation page, linking the specific page within the presentation.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentationPage\n\nRefers To\n\nPresentationPage\n\n\n\n |
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nThe ID of the record in the external source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the external source system from which the record was imported.\n\n\n\n |\n\n## Associated Objects\n\n

This object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n[PresentationLinkedPageFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n[PresentationLinkedPageHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

---

# PresentationPage
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpage.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpage.htm)

# PresentationPage\n\nRepresents a collection of pages that can be used within a presentation. Each page can contain multiple slides. Pages can be reused across different presentations. This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| ActivationDate | 
Type\n\ndateTime\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nThe date and time when the presentation page is activated and available for use.\n\n\n\n |
| ContentDocumentId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort, Update\n\nDescription\n\nThe content document that is the PDF or ZIP file containing the content for the presentation page.\n\nThis field is a relationship field.\n\nRelationship Name\n\nContentDocument\n\nRefers To\n\nContentDocument\n\n\n\n

|
| DeactivationDate | \n\nType\n\ndateTime\n\nProperties\n\nCreate, Filter, Nillable, Sort, Update\n\nDescription\n\nThe date and time when the presentation page is deactivated and no longer available for use.\n\n\n\n |
| EmailTemplateId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA lookup field that links the presentation page to a specific email template. This email template can be used for sending studies, statistics, or other relevant content associated with the current presentation page via email.\n\nThis field is a relationship field.\n\nRelationship Name\n\nEmailTemplate\n\nRefers To\n\nLifeSciEmailTemplate\n\n\n\n |
| IsAdditionalContent | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nIndicates whether the page is an asset. Assets are PDF files which can be added to ZIP presentations and referenced by link from any presentation slide.\n\n

The default value is false.\n\n\n\n |
| IsMandatory | \n\nType\n\nboolean\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nIndicates whether a specific page in the presentation must be shown.\n\nThe default value is false.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Sort, Update\n\nDescription\n\nThe name of the presentation page.\n\n\n\n |
| OwnerId | \n\nType\n\n

reference\n\nProperties\n\nCreate, Defaulted on create, Filter, Group, Sort, Update\n\nDescription\n\nThe ID of the user who owns this presentation page.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nOwner\n\nRefers To\n\nGroup, User\n\n\n\n |
| PageNumber | \n\nType\n\nint\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe page number of this page in the presentation PDF file. There's no page number for presentations with ZIP file type.\n\n\n\n |
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nThe ID of the record in the external source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the external source system from which the record was imported.\n\n\n\n |
| Status | \n\nType\n\npicklist\n\nProperties\n\n

Create, Filter, Group, Restricted picklist, Sort, Update\n\nDescription\n\nRequired. Indicates whether the page is active, meaning it can be included and used in a presentation.\n\nPossible values are:\n\n-   Active
-   Inactive\n\n\n\n\n\n |
| Type | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Restricted picklist, Sort, Update\n\nDescription\n\nRequired. Specifies whether the content is in PDF or ZIP format.\n\nPossible values are:\n\n-   PDF
-   ZIP\n\n\n\n\n\n |\n\n## Associated Objects\n\nThis object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n

[PresentationPageFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n[PresentationPageHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

[PresentationPageShare](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_share.htm "StandardObjectNameShare is the model for all share objects associated with standard objects. These objects represent a sharing entry on the standard object.")\n\nSharing is available for the object.\n\n

---

# PresentationPageProduct
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpageproduct.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpageproduct.htm)

# PresentationPageProduct\n\nRepresents the link between a presentation page and a product, and may also include a connection to related product message (product guidance). This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| DisplayOrder | 
Type\n\nint\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nIndicates the order of the related product message (product guidance) within the presentation page.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\n

Description\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\nAutonumber, Defaulted on create, Filter, idLookup, Sort\n\nDescription\n\nThe name of the presentation page product.\n\n\n\n |
| PresentationPageId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort\n\nDescription\n\nRequired. Indicates the reference to the presentation page.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentationPage\n\nRelationship Type\n\nMaster-detail\n\nRefers To\n\nPresentationPage (the master object)\n\n\n\n |
| ProductGuidanceId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA reference to the Product Guidance object, linking a specific product message to the presentation page.\n\n

This field is a relationship field.\n\nRelationship Name\n\nProductGuidance\n\nRefers To\n\nProductGuidance\n\n\n\n |
| ProductId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort, Update\n\nDescription\n\nRequired. A reference to both the Product2 and LSMarketableProduct objects, associating a product with the presentation page.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nProduct\n\nRefers To\n\nLifeSciMarketableProduct, Product2\n\n\n\n |
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\nThe ID of the record in the external source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the external source system from which the record was imported.\n\n\n\n |\n\n## Associated Objects\n\n

This object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n[PresentationPageProductFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n[PresentationPageProductHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

---

# PresentationPartyAccess
**Source:** [https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpartyaccess.htm](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_objects_presentationpartyaccess.htm)

# PresentationPartyAccess\n\nRepresents the access-sharing details of a presentation with a healthcare professional, including an expiration date for that access. This object is available in API version 65.0 and later.\n\n## Supported Calls\n\ncreate(), delete(), describeLayout(), describeSObjects(), getDeleted(), getUpdated(), query(), retrieve(), search(), undelete(), update(), upsert()\n\n## Fields\n\n| Field | Details |
| --- | --- |
| AccessIdentifier | 
Type\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nA UUID that identifies the presentation to show and the user who the link is intended for when sales representatives send presentations as links in email content.\n\n\n\n |
| AccessRole | \n\nType\n\npicklist\n\nProperties\n\nCreate, Filter, Group, Restricted picklist, Sort, Update\n\nDescription\n\nRequired. Represents the role of the party (Account) in relation to the presentation, and define their level of access and permissions.\n\n

Possible values are:\n\n-   Approver
-   Author
-   Viewer\n\n\n\n\n\n |
| EffectiveEndDate | \n\nType\n\ndateTime\n\nProperties\n\nCreate, Filter, Sort, Update\n\nDescription\n\nThe date when access to the presentation expires.\n\n\n\n |
| EffectiveStartDate | \n\nType\n\ndateTime\n\nProperties\n\nCreate, Filter, Sort, Update\n\nDescription\n\nThe date when access to the presentation begins.\n\n\n\n |
| LastReferencedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last accessed this record indirectly, for example, through a list view or related record.\n\n\n\n |
| LastViewedDate | \n\nType\n\ndateTime\n\nProperties\n\nFilter, Nillable, Sort\n\nDescription\n\nThe timestamp when the current user last viewed this record or list view.\n\nIf this value is null, and LastReferenceDate is not null, the user accessed this record or list view indirectly.\n\n\n\n\n\n |
| Name | \n\nType\n\nstring\n\nProperties\n\n

Create, Filter, Group, idLookup, Sort, Update\n\nDescription\n\nRequired. Name of the presentation party access.\n\n\n\n |
| PartyId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort, Update\n\nDescription\n\nRequired. Identifies the party with whom this record is shared, granting access to the presentation associated with this record.\n\nThis field is a polymorphic relationship field.\n\nRelationship Name\n\nParty\n\nRefers To\n\nAccount\n\n\n\n |
| PresentationId | \n\nType\n\nreference\n\nProperties\n\nCreate, Filter, Group, Sort\n\nDescription\n\nRequired. Indicates the reference to the presentation.\n\nThis field is a relationship field.\n\nRelationship Name\n\nPresentation\n\nRelationship Type\n\nMaster-detail\n\nRefers To\n\nPresentation (the master object)\n\n\n\n |
| SourceSystemIdentifier | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, idLookup, Nillable, Sort, Update\n\nDescription\n\n

The ID of the record in the external source system for data integrations.\n\n\n\n |
| SourceSystemName | \n\nType\n\nstring\n\nProperties\n\nCreate, Filter, Group, Nillable, Sort, Update\n\nDescription\n\nThe name of the external source system from which the record was imported.\n\n\n\n |\n\n## Associated Objects\n\nThis object has the following associated objects. If the API version isn’t specified, they’re available in the same API versions as this object. Otherwise, they’re available in the specified API version and later.\n\n[PresentationPartyAccessFeed](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_feed.htm "StandardObjectNameFeed is the model for all feed objects associated with standard objects. These objects represent the posts and feed-tracked changes of a standard object.")\n\nFeed tracking is available for the object.\n\n

[PresentationPartyAccessHistory](/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/sforce_api_associated_objects_history.htm "StandardObjectNameHistory is the model for all history objects associated with standard objects. These objects represent the history of changes to the values in the fields of a standard object.")\n\nHistory is available for tracked fields of the object.\n\n

---

# Adverse Events Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/adverse-events.html](https://developer.salesforce.com/docs/platform/data-models/guide/adverse-events.html)

# Adverse Events Data Model

![Data model diagram for Participant Management](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/life-sciences-adverse-events.png)

_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_

## Diagram Scope

Entities and relationships used to manage and document any unfavorable signs, symptoms, or diseases that occur in participants during a research study.

## Entities (objects) Included

Account, Adverse Event Action, Adverse Event Cause, Adverse Event Contributing Factor, Adverse Event Entry, Adverse Event Outcome, Adverse Event Party, Adverse Event Resulting Effect, Adverse Event Supporting Info, Care Program Enrollee, Care Program Site, Clinical Encounter, Code Set, Code Set Bundle, Healthcare Facility, Healthcare Provider, Research Study

## More Info

-   [Adverse Events](https://developer.salesforce.com/docs/atlas.en-us.254.0.life_sciences_dev_guide.meta/life_sciences_dev_guide/lsc_adverse_event.htm)

## How Do I Read These Diagrams?

See [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

# Financial Assistance for Patient Services Program Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/financial-assistance-for-patient-services-program.html](https://developer.salesforce.com/docs/platform/data-models/guide/financial-assistance-for-patient-services-program.html)

# Financial Assistance for Patient Services Program Data Model

![Data model diagram for Participant Management](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/life-sciences-cloud-financial-assistance-for-patient-services-program.png)

_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_

## Diagram Scope

Entities and relationships involved in enrolling eligible patients in various financial assistance programs to help with their out-of-pocket medical expenses.

## Entities (objects) Included

Account, Benefit, Benefit Assignment, Benefit Disbursement, Benefit Type, Care Program, Care Program Assistance, Care Program Eligibility Rule, Care Program Enrollee, Care Program Enrollee Product, Care Program Product, Contact, Enrollment Eligibility Criteria, ExpressionSet, Others, Person Account (Member), Product2, Program, Program Enrollment, Program Enrollment Eligibility Criteria, Program Recommendation Rule

## More Info

-   [Financial Assistance Program](https://developer.salesforce.com/docs/atlas.en-us.health_cloud_object_reference.meta/health_cloud_object_reference/hc_financial_assistance_program_data_model.htm)

## How Do I Read These Diagrams?

See [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

# Intelligent Content Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/intelligent-content.html](https://developer.salesforce.com/docs/platform/data-models/guide/intelligent-content.html)

# Intelligent Content Data Model\n\n![Data model diagram for Intelligent Content](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/life-sciences-intelligent-content-100925.png)\n\n_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_\n\n## Diagram Scope\n\nEntities and relationships for delivering, personalizing, and analyzing targeted content for healthcare professionals.\n\n## Entities (objects) Included\n\nAccount, Content Document, Content Document Link, Content Version, Life Science Email Template, Life Science Marketable Product, Presentation, Presentation Click Stream Entry, Presentation Forum, Presentation Linked Page, Presentation Page, Presentation Page Product, Presentation Party Access, Product Guidance, Product2, Provider Visit, Provider Visit Detailing Product Message, Provider Visit Product Detailing, Visit\n\n## More Info\n\n

-   [Life Sciences Cloud Data Model](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_sforce_api_objects.htm)\n\n## How Do I Read These Diagrams?\n\nSee [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

# Life Sciences Cloud
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html](https://developer.salesforce.com/docs/platform/data-models/guide/life-sciences-cloud-category.html)

# Life Sciences Cloud

-   [Adverse Events](/docs/platform/data-models/guide/adverse-events.html)
-   [Partner Inventory Tracking](/docs/platform/data-models/guide/partner-inventory-tracking.html)
-   [Financial Assistance for Patient Services Program](/docs/platform/data-models/guide/financial-assistance-for-patient-services-program.html)
-   [Participant Management](/docs/platform/data-models/guide/participant-management.html)
-   [Site Management](/docs/platform/data-models/guide/site-management.html)
-   [Account Management](/docs/platform/data-models/guide/account-management.html)
-   [Activity Plans](/docs/platform/data-models/guide/activity-plans.html)
-   [App Alerts](/docs/platform/data-models/guide/app-alerts.html)
-   [Commercial Configuration](/docs/platform/data-models/guide/commercial-configuration.html)
-   [Life Sciences Consent Management](/docs/platform/data-models/guide/life-sciences-consent-management.html)
-   [Data Change Requests](/docs/platform/data-models/guide/data-change-requests.html)
-   [Field Email](/docs/platform/data-models/guide/field-email.html)
-   [General Events](/docs/platform/data-models/guide/general-events.html)
-   [Intelligent Content](/docs/platform/data-models/guide/intelligent-content.html)
-   [Inventory Management](/docs/platform/data-models/guide/inventory-management.html)
-   [Key Account Management - Account Plan](/docs/platform/data-models/guide/key-account-management-account-plan.html)
-   [Key Account Management - Territory Plan](/docs/platform/data-models/guide/key-account-management-territory-plan.html)
-   [Lists and Filters](/docs/platform/data-models/guide/lists-and-filters.html)
-   [Medical Inquiries](/docs/platform/data-models/guide/medical-inquiries.html)
-   [Mobile Metadata](/docs/platform/data-models/guide/mobile-metadata.html)
-   [Mobile Sync](/docs/platform/data-models/guide/mobile-sync.html)
-   [Next Best](/docs/platform/data-models/guide/next-best.html)
-   [Product Management](/docs/platform/data-models/guide/product-management.html)
-   [Remote Engagement](/docs/platform/data-models/guide/remote-engagement.html)
-   [Sample Limits and Product Territory Allocation](/docs/platform/data-models/guide/sample-limits-and-product-territory-allocation.html)
-   [Segmentation](/docs/platform/data-models/guide/segmentation.html)
-   [Subject Management](/docs/platform/data-models/guide/subject-management.html)
-   [Surveys](/docs/platform/data-models/guide/surveys.html)
-   [System Objects - Integration Job Run](/docs/platform/data-models/guide/system-objects-integration-job-run.html)
-   [System Objects - Trigger Handlers](/docs/platform/data-models/guide/system-objects-trigger-handlers.html)
-   [System Objects - User and Device Management](/docs/platform/data-models/guide/system-objects-user-and-device-management.html)
-   [Territory Management - Alignment](/docs/platform/data-models/guide/territory-mgmt-alignment.html)
-   [Territory Management - Territory Content Template Assignment](/docs/platform/data-models/guide/territory-mgmt-territory-content-template-assignment.html)
-   [Territory Management - User Downtime](/docs/platform/data-models/guide/territory-mgmt-user-downtime.html)
-   [Visit Management](/docs/platform/data-models/guide/visit-management.html)
-   [Workflow Management](/docs/platform/data-models/guide/workflow-management.html)\n\n

---

# Next Best Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/next-best.html](https://developer.salesforce.com/docs/platform/data-models/guide/next-best.html)

# Next Best Data Model

![Data model diagram for Next Best](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/life-sciences-next-best-100925.png)

_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_

## Diagram Scope

Entities and relationships for generating and managing AI-driven customer, action, and message recommendations.

## Entities (objects) Included

Account, Life Science Email, Life Science Marketable Product, Managed Event, Product Guidance, Product2, Territory Account Product Message Score, Territory Account Recommended Action, Territory Account Score, Territory2, Visit

## More Info

-   [Life Sciences Cloud Data Model](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/life_sciences_sforce_api_objects.htm)

## How Do I Read These Diagrams?

See [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

# Participant Management Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/participant-management.html](https://developer.salesforce.com/docs/platform/data-models/guide/participant-management.html)

# Participant Management Data Model

![Data model diagram for Participant Management](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/life-sciences-participant-mgmt.png)

_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_

## Diagram Scope

Entities and relationships allowing streamlined recruitment and enrollment processes in clinical trials with advanced digital solutions – including storing clinical trial data representing care programs and research studies

## Entities (objects) Included

Authorization Form Consent, Care Plan Template, Care Program, Care Program Detail, Care Program Eligibility Rule, Care Program Enrollee, Care Program Enrollee Status Period, Care Program Enrollment Evaluation Result, Care Program Site, Care Program Status Period, Care Program Team Member, Care Program Team Member Role Period, Code Set, Code Set Bundle, Digital Signature, Digital Verification, Enrollment Eligibility Criteria, Health Care Facility, Informed Consent, Omni Process, Person Account, Research Study, Research Study Candidate, Research Study Candidate Status Period, Research Study Protocol Information, Research Study Relation, Research Study Searchable Field

## More Info

-   [Participant Management](https://developer.salesforce.com/docs/atlas.en-us.life_sciences_dev_guide.meta/life_sciences_dev_guide/lsc_participant_management_data_model.htm)

## How Do I Read These Diagrams?

See [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

# Channel Partner Inventory Tracking Data Model
**Source:** [https://developer.salesforce.com/docs/platform/data-models/guide/partner-inventory-tracking.html](https://developer.salesforce.com/docs/platform/data-models/guide/partner-inventory-tracking.html)

# Channel Partner Inventory Tracking Data Model

![Data model diagram for Participant Management](https://a.sfdcstatic.com/developer-website/sfdocs/diagrams/media/channel-partner-inventory-tracking-050925.png)

_To view a higher-resolution version of this diagram, right-click (or Control-click on Mac) and select "Open Image in New Tab."_

## Diagram Scope

Entities and relationships allowing original equipment manufacturers (OEMs) to get visibility into partner inventory.

## Entities (objects) Included

Account, Journal, Location, Partner Unsold Inventory, Partner Unsold Inventory Ledger, Product

## More Info

-   [Channel Partner Inventory Tracking](https://help.salesforce.com/s/articleView?id=release-notes.rn_chrm_inventory_parent.htm&release=256&type=5)

## How Do I Read These Diagrams?

See [Salesforce Data Model Notation](/docs/platform/data-models/guide/salesforce-data-model-notation.md).\n\n

---

