from silence.decorators import endpoint

@endpoint(
    route="/followingfollowers",
    method="GET",
    sql="SELECT * FROM FollowingFollowers"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/followingfollowers",
    method="GET",
    sql="SELECT * FROM followingfollowers WHERE Seguido = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/followingfollowers",
    method="POST",
    sql="INSERT INTO FollowingFollowers (ffId, Siguiendo,Seguido) VALUES ($ffId,$Siguiendo, $Seguido)",
    auth_required=True
)
def create(ffId,Siguiendo,Seguido):
    pass

###############################################################################

@endpoint(
    route="/followingfollowers/$ffId",
    method="DELETE",
    sql="DELETE FROM FollowingFollowers WHERE ffId=$ffId",
    auth_required=True
)
def delete():
    pass