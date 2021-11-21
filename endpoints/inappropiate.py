from silence.decorators import endpoint

@endpoint(
    route="/InappropriateWords",
    method="GET",
    sql="SELECT * FROM InappropriateWords"
)
def get_all():
    pass