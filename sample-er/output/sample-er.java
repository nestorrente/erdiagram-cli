/* ========== User class ========== */

import java.nio.ByteBuffer;
import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class User {

    private Long id;
    @NotBlank
    @Size(max = 50)
    private String username;
    @NotBlank
    @Size(max = 50)
    private String name;
    private LocalDate birthday;
    private ByteBuffer avatar;
    @NotNull
    private Boolean active;
    @NotNull
    private Country country;
    private Country alternativeCountry;
    @NotNull
    private List<Permission> permissions;
    @NotNull
    private List<User> follows;
    @NotNull
    private List<User> followers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public ByteBuffer getAvatar() {
        return avatar;
    }

    public void setAvatar(ByteBuffer avatar) {
        this.avatar = avatar;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Country getAlternativeCountry() {
        return alternativeCountry;
    }

    public void setAlternativeCountry(Country alternativeCountry) {
        this.alternativeCountry = alternativeCountry;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getFollows() {
        return follows;
    }

    public void setFollows(List<User> follows) {
        this.follows = follows;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }

}

/* ========== Country class ========== */

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Country {

    private Long theCountryId;
    @NotBlank
    @Size(max = 5)
    private String code;
    @NotBlank
    @Size(max = 100)
    private String name;

    public Long getTheCountryId() {
        return theCountryId;
    }

    public void setTheCountryId(Long theCountryId) {
        this.theCountryId = theCountryId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

/* ========== Permission class ========== */

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Permission {

    private Long id;
    @NotBlank
    @Size(max = 30)
    private String code;
    @NotBlank
    @Size(max = 200)
    private String description;
    @NotNull
    private List<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

}

/* ========== Tree class ========== */

import javax.validation.constraints.NotNull;

public class Tree {

    private Long id;
    @NotNull
    private TreeNode headNode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TreeNode getHeadNode() {
        return headNode;
    }

    public void setHeadNode(TreeNode headNode) {
        this.headNode = headNode;
    }

}

/* ========== TreeNode class ========== */

import java.util.List;
import javax.validation.constraints.NotNull;

public class TreeNode {

    private Long id;
    @NotNull
    private Integer value;
    private TreeNode parent;
    @NotNull
    private List<TreeNode> children;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public TreeNode getParent() {
        return parent;
    }

    public void setParent(TreeNode parent) {
        this.parent = parent;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

}
