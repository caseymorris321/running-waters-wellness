import { Cloudinary } from 'cloudinary';

var cl = new Cloudinary({cloud_name: "demo", secure: true});

var tag = cl.imageTag("flowers_j5u1ap");
tag.toHtml();