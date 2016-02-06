import json

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def landing_page():
    return render_template('index.html')

@app.route('/getJson', methods=['GET'])
def get_csv():
    list_of_businesses = [{"biz_id":1,"name":"Pho Cafe","address":"509 E Green Street\nChampaign"},{"biz_id":2,"name":"Panda Express","address":"208 E Green Street\nChampaign"}]
    return json.dumps(list_of_businesses);

@app.route('/analysis')
def show_analysis():
    return render_template('analytics.html')

@app.route('/getJsonAnalytics', methods=['GET'])
def get_json_analytics():
    biz_id = request.args.get('biz_id')
    print(biz_id)
    big_json_dict ={'biz_name':'Panda Express','biz_id':'234', 'lat':40.6892, 'long':74.0444, 'avg_stars': 2.3, 'address':'509 E Stoughton\nChampaign, IL', 'tot_reviews':123, 'tot_checkins': 456}
    return json.dumps(big_json_dict);


if __name__ == '__main__':
    app.run()
