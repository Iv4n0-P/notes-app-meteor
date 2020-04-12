import assert from "assert";
import './api/users.test.js'
import './api/notes.test.js'
import './ui/PrivateHeader.test.js'
import './ui/Login.test.js'
import './ui/NoteListHeader.test.js'
import './ui/NoteListItem.test.js'
import './ui/NoteList.test.js'
import './ui/Editor.test.js'

describe("notes-app", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "notes-app");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

   if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

