from silence.decorators import endpoint

@endpoint(
    route="/photocategories",
    method="GET",
    sql="SELECT * FROM PhotoCategories"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/photocategories",
    method="GET",
    sql="SELECT * FROM PhotoCategories WHERE photoId=$photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photocategories",
    method="POST",
    sql="INSERT INTO PhotoCategories (photoId,category) values ($photoId, $category)"
)
def get_by_id(category, photoId):
    pass

###############################################################################

@endpoint(
    route="/photocategories/$photocategoryId",
    method="DELETE",
    sql="DELETE FROM PhotoCategories WHERE photocategoryId=$photocategoryId"
)
def delete():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/photocategories/$category",
    method="DELETE",
    sql="DELETE FROM PhotoCategories WHERE (photoId=$photoId AND category=$category)"
)
def deletec():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/photocategories",
    method="DELETE",
    sql="DELETE FROM PhotoCategories WHERE photoId=$photoId"
)
def deletecc():
    pass