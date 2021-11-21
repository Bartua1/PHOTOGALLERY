from silence.decorators import endpoint

@endpoint(
    route="/photos/$photoId/comments",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (comment, userId, photoId) VALUES ($comment, $userId, $photoId)",
    description="Creates a new comment",
    auth_required=True
)
def create(comment, userId, photoId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/comments",
    method="DELETE",
    sql="DELETE FROM Comments WHERE photoId=$photoId",
    auth_required=True
)
def delete(photoId):
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM Comments",
    auth_required=True
)
def getAll():
    pass
