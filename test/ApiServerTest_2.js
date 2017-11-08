/* eslint no-undef: "off" */

const SRC = '../src';
const Beans = require('qnode-beans');
const ApiServer = require(`${SRC}/ApiServer`);
const mockFs = require('mock-fs');

const mockFsObjects = {
    'api': {
        'root_api.js': '',
        'not_an_api.md': '',
        'empty_dir': {},
        'sub_dir': {
            'sub_api.js': ''
        }
    }
};

describe("ApiServer test suite 2: ", function() {

    beforeAll(function() {
        mockFs(mockFsObjects, { createCwd: false, createTmp: false });
    });

    afterAll(function() {
        mockFs.restore();
    });

    it("_findAllApiFiles(): happy", function() {
        const beans = new Beans();
        const r = new ApiServer();
        r._loadAllApi = () => {};
        beans.render(r);
        r.init();

        expect(r._apiFileList.length).toBe(2);
        expect(r._apiFileList[0]).toBe('/root_api');
        expect(r._apiFileList[1]).toBe('/sub_dir/sub_api');
    });

});