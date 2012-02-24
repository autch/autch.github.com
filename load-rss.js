
YQL = {
    yql_url: 'http://query.yahooapis.com/v1/public/yql?callback=?',

    query: function(query, on_ready) {
	$.getJSON(this.yql_url, {
	    q: query,
	    format: "json",
	}, function(data) {
	    on_ready(data.query.results);
	});
    },
    get_timeline: function(table, url, sort_key, limit, on_ready) {
	var query = "SELECT * FROM %t WHERE url = '%s'".replace(/%t/, table).replace(/%s/, url);
	if(sort_key) {
	    query += "| SORT(field='%f', descending='true')".replace(/%f/, sort_key);
	}
	if(limit) {
	    query += "| TRUNCATE(count='%l')".replace(/%l/, limit);
	}
	this.query(query, on_ready);
    },
    get_rss: function(url, limit, on_ready) {
	this.get_timeline('rss', url, 'date', limit, function(results) { on_ready(results.item) });
    },
    get_atom: function(url, limit, on_ready) {
	this.get_timeline('atom', url, 'updated', limit, function(results) { on_ready(results.entry) });
    },
}

function initialize_antenna_feeds()
{
    YQL.get_rss('http://a.hatena.ne.jp/autch/rss', 10, function(items) {
	var container = $("#antennasection");
	container.empty();
	for(var i = 0; i < items.length; i++) {
	    var entry = items[i];
	    var div = jQuery("<div class=\"antennaitem\">");
	    var a = jQuery("<a>").text(entry.title).attr("href", entry.link);
	    div.append(a);
	    container.append(div);
	}
    });
}

function initialize_diary_feeds()
{
    YQL.get_rss('http://d.hatena.ne.jp/autch/rss', 5, function(items) {
	var container = $("#rsssection");
	container.empty();
	for(var i = 0; i < items.length; i++) {
	    var entry = items[i];
	    var dt = jQuery("<dt>");
	    var datetime = " (" + entry.date.replace('T', ' ').replace(/\+.*$/, '') + ")";
	    var dd = jQuery("<dd>").append(entry.description + datetime);
	    var a = jQuery("<a>").text(entry.title).attr("href", entry.link);
	    dt.append(a)
	    container.append(dt).append(dd);
	}	
    });
}

function initialize_github_feeds()
{
    YQL.get_atom('https://github.com/autch.atom', 5, function(entries) {
	var container = $("dl.projects");
	container.empty();
	for(var i = 0; i < entries.length; i++) {
	    var entry = entries[i];
	    var dt = jQuery("<dt>");
	    var dd = jQuery("<dd>").append(entry.content.content);
	    var a = jQuery("<a>").text(entry.title.content).attr("href", entry.link.href);
	    dt.append(a);
	    container.append(dt) /*.append(dd)*/;
	}
    });
}

function construct_uls(url, limit, parent_ul_id)
{
    YQL.get_rss(url, limit, function(entries) {
	var container = jQuery(parent_ul_id);
	container.empty();
	for(var i = entries.length - 1; i >= 0; i--) {
	    var entry = entries[i];
	    var li = jQuery('<li>');
	    var a = jQuery("<a>").text(entry.title).attr("href", entry.link).attr("target", "_blank");
	    li.append(a);
	    container.prepend(li);
	}
	jQuery(parent_ul_id).listview();
	jQuery(parent_ul_id).listview("refresh");
    });
}

