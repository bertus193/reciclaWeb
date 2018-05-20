--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.8
-- Dumped by pg_dump version 9.6.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: mwwmxiljosjphk
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";


--
-- Name: EXTENSION "plpgsql"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "plpgsql" IS 'PL/pgSQL procedural language';


--
-- Name: recycletype; Type: TYPE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TYPE "public"."recycletype" AS ENUM (
    'Organic',
    'Plastic',
    'Glass',
    'Paper',
    'WritingMaterial'
);


ALTER TYPE public.recycletype OWNER TO mwwmxiljosjphk;

--
-- Name: typerecycle; Type: TYPE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TYPE "public"."typerecycle" AS ENUM (
    'Organic',
    'Plastic',
    'Glass',
    'Paper',
    'WritingMaterial'
);


ALTER TYPE public.typerecycle OWNER TO mwwmxiljosjphk;

--
-- Name: typeuser; Type: TYPE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TYPE "public"."typeuser" AS ENUM (
    'Normal',
    'Facebook',
    'Instagram'
);


ALTER TYPE public.typeuser OWNER TO mwwmxiljosjphk;

--
-- Name: userrecycle; Type: TYPE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TYPE "public"."userrecycle" AS ENUM (
    'Normal',
    'Facebook',
    'Instagram'
);


ALTER TYPE public.userrecycle OWNER TO mwwmxiljosjphk;

--
-- Name: usertype; Type: TYPE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TYPE "public"."usertype" AS ENUM (
    'Normal',
    'Facebook',
    'Instagram'
);


ALTER TYPE public.usertype OWNER TO mwwmxiljosjphk;

--
-- Name: generate_create_table_statement(character varying); Type: FUNCTION; Schema: public; Owner: mwwmxiljosjphk
--

CREATE FUNCTION "public"."generate_create_table_statement"("p_table_name" character varying) RETURNS "text"
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
    v_table_ddl   text;
    column_record record;
BEGIN
    FOR column_record IN 
        SELECT 
            b.nspname as schema_name,
            b.relname as table_name,
            a.attname as column_name,
            pg_catalog.format_type(a.atttypid, a.atttypmod) as column_type,
            CASE WHEN 
                (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)
                 FROM pg_catalog.pg_attrdef d
                 WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef) IS NOT NULL THEN
                'DEFAULT '|| (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)
                              FROM pg_catalog.pg_attrdef d
                              WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef)
            ELSE
                ''
            END as column_default_value,
            CASE WHEN a.attnotnull = true THEN 
                'NOT NULL'
            ELSE
                'NULL'
            END as column_not_null,
            a.attnum as attnum,
            e.max_attnum as max_attnum
        FROM 
            pg_catalog.pg_attribute a
            INNER JOIN 
             (SELECT c.oid,
                n.nspname,
                c.relname
              FROM pg_catalog.pg_class c
                   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
              WHERE c.relname ~ ('^('||p_table_name||')$')
                AND pg_catalog.pg_table_is_visible(c.oid)
              ORDER BY 2, 3) b
            ON a.attrelid = b.oid
            INNER JOIN 
             (SELECT 
                  a.attrelid,
                  max(a.attnum) as max_attnum
              FROM pg_catalog.pg_attribute a
              WHERE a.attnum > 0 
                AND NOT a.attisdropped
              GROUP BY a.attrelid) e
            ON a.attrelid=e.attrelid
        WHERE a.attnum > 0 
          AND NOT a.attisdropped
        ORDER BY a.attnum
    LOOP
        IF column_record.attnum = 1 THEN
            v_table_ddl:='CREATE TABLE '||column_record.schema_name||'.'||column_record.table_name||' (';
        ELSE
            v_table_ddl:=v_table_ddl||',';
        END IF;

        IF column_record.attnum <= column_record.max_attnum THEN
            v_table_ddl:=v_table_ddl||chr(10)||
                     '    '||column_record.column_name||' '||column_record.column_type||' '||column_record.column_default_value||' '||column_record.column_not_null;
        END IF;
    END LOOP;

    v_table_ddl:=v_table_ddl||');';
    RETURN v_table_ddl;
END;
$_$;


ALTER FUNCTION "public"."generate_create_table_statement"("p_table_name" character varying) OWNER TO mwwmxiljosjphk;

--
-- Name: auth_users_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."auth_users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_users_id_seq OWNER TO mwwmxiljosjphk;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: collective; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."collective" (
    "id" integer NOT NULL,
    "name" "text",
    "abbreviation" "text"
);


ALTER TABLE public.collective OWNER TO mwwmxiljosjphk;

--
-- Name: collective_type_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."collective_type_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collective_type_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: collective_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."collective_type_id_seq" OWNED BY "public"."collective"."id";


--
-- Name: item_type; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."item_type" (
    "id" integer NOT NULL,
    "recycle_value" integer DEFAULT 0,
    "type" "text" DEFAULT 'Organic'::"text",
    "type_color" "text" DEFAULT 'green'::"text",
    "type_es" "text" DEFAULT 'Orgánico'::"text"
);


ALTER TABLE public.item_type OWNER TO mwwmxiljosjphk;

--
-- Name: item_type_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."item_type_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_type_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: item_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."item_type_id_seq" OWNED BY "public"."item_type"."id";


--
-- Name: item_type_name; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."item_type_name" (
    "id" integer NOT NULL,
    "description" "text",
    "item_type" integer
);


ALTER TABLE public.item_type_name OWNER TO mwwmxiljosjphk;

--
-- Name: item_type_name_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."item_type_name_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_type_name_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: item_type_name_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."item_type_name_id_seq" OWNED BY "public"."item_type_name"."id";


--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: log; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."log" (
    "id" integer DEFAULT "nextval"('"public"."log_id_seq"'::"regclass") NOT NULL,
    "timestamp" timestamp with time zone DEFAULT "now"(),
    "status" integer,
    "exception" "text",
    "message" "text",
    "path" "text",
    "status_name" "text",
    "base64_image" "text"
);


ALTER TABLE public.log OWNER TO mwwmxiljosjphk;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logs_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."logs_id_seq" OWNED BY "public"."log"."id";


--
-- Name: position; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."position" (
    "id" integer NOT NULL,
    "latitude" double precision,
    "longitude" double precision
);


ALTER TABLE public."position" OWNER TO mwwmxiljosjphk;

--
-- Name: position_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."position_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.position_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."position_id_seq" OWNED BY "public"."position"."id";


--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: question; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."question" (
    "id" integer DEFAULT "nextval"('"public"."question_id_seq"'::"regclass") NOT NULL,
    "name" "text",
    "question_value" integer DEFAULT 0,
    "correct_reply" integer
);


ALTER TABLE public.question OWNER TO mwwmxiljosjphk;

--
-- Name: recycle_items; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."recycle_items" (
    "id" integer NOT NULL,
    "name" "text",
    "image" "text" DEFAULT 'assets/imgs/icons/recycle.png'::"text",
    "recycle_user" integer,
    "item_type" integer NOT NULL,
    "storage" integer,
    "created_date" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE public.recycle_items OWNER TO mwwmxiljosjphk;

--
-- Name: recycle_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."recycle_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recycle_items_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: recycle_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."recycle_items_id_seq" OWNED BY "public"."recycle_items"."id";


--
-- Name: reply_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."reply_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: reply; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."reply" (
    "id" integer DEFAULT "nextval"('"public"."reply_id_seq"'::"regclass") NOT NULL,
    "name" "text",
    "question" integer
);


ALTER TABLE public.reply OWNER TO mwwmxiljosjphk;

--
-- Name: storage; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."storage" (
    "id" integer NOT NULL,
    "name" "text",
    "item_type" integer NOT NULL,
    "storage_point" integer NOT NULL
);


ALTER TABLE public.storage OWNER TO mwwmxiljosjphk;

--
-- Name: storage_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."storage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storage_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: storage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."storage_id_seq" OWNED BY "public"."storage"."id";


--
-- Name: storage_point; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."storage_point" (
    "id" integer NOT NULL,
    "name" "text",
    "position" integer
);


ALTER TABLE public.storage_point OWNER TO mwwmxiljosjphk;

--
-- Name: storage_point_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."storage_point_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storage_point_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: storage_point_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."storage_point_id_seq" OWNED BY "public"."storage_point"."id";


--
-- Name: tip; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."tip" (
    "id" integer NOT NULL,
    "name" "text",
    "description" "text"
);


ALTER TABLE public.tip OWNER TO mwwmxiljosjphk;

--
-- Name: tip_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."tip_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tip_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: tip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."tip_id_seq" OWNED BY "public"."tip"."id";


--
-- Name: user_question; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."user_question" (
    "id" integer NOT NULL,
    "user" integer,
    "question" integer,
    "user_reply" integer,
    "created_date" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE public.user_question OWNER TO mwwmxiljosjphk;

--
-- Name: user_question_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."user_question_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_question_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: user_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."user_question_id_seq" OWNED BY "public"."user_question"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "email" "text",
    "full_name" "text",
    "profile_picture" "text",
    "access_token" "text",
    "enabled" boolean DEFAULT true,
    "created_date" timestamp with time zone DEFAULT "now"(),
    "last_position" integer,
    "password" "text",
    "username" "text",
    "type" "text" DEFAULT 'Normal'::"text",
    "points" integer DEFAULT 0,
    "game_points" integer DEFAULT 0,
    "last_game_date" timestamp with time zone DEFAULT "now"(),
    "collective" integer,
    "birthdate" timestamp with time zone DEFAULT "now"(),
    "school" "text",
    "gender" "text" DEFAULT 'NSNC'::"text",
    "reset_pwd_code" "text",
    "reset_pwd_code_date" timestamp with time zone
);


ALTER TABLE public.users OWNER TO mwwmxiljosjphk;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mwwmxiljosjphk
--

CREATE SEQUENCE "public"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO mwwmxiljosjphk;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwwmxiljosjphk
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: collective id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."collective" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."collective_type_id_seq"'::"regclass");


--
-- Name: item_type id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."item_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."item_type_id_seq"'::"regclass");


--
-- Name: item_type_name id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."item_type_name" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."item_type_name_id_seq"'::"regclass");


--
-- Name: position id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."position" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."position_id_seq"'::"regclass");


--
-- Name: recycle_items id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."recycle_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."recycle_items_id_seq"'::"regclass");


--
-- Name: storage id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."storage_id_seq"'::"regclass");


--
-- Name: storage_point id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage_point" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."storage_point_id_seq"'::"regclass");


--
-- Name: tip id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."tip" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tip_id_seq"'::"regclass");


--
-- Name: user_question id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."user_question" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."user_question_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Name: collective collective_type_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."collective"
    ADD CONSTRAINT "collective_type_pkey" PRIMARY KEY ("id");


--
-- Name: item_type_name item_type_name_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."item_type_name"
    ADD CONSTRAINT "item_type_name_pkey" PRIMARY KEY ("id");


--
-- Name: item_type item_type_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."item_type"
    ADD CONSTRAINT "item_type_pkey" PRIMARY KEY ("id");


--
-- Name: log logs_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."log"
    ADD CONSTRAINT "logs_pkey" PRIMARY KEY ("id");


--
-- Name: position position_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."position"
    ADD CONSTRAINT "position_pkey" PRIMARY KEY ("id");


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."question"
    ADD CONSTRAINT "question_pkey" PRIMARY KEY ("id");


--
-- Name: recycle_items recycle_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."recycle_items"
    ADD CONSTRAINT "recycle_items_pkey" PRIMARY KEY ("id");


--
-- Name: reply reply_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."reply"
    ADD CONSTRAINT "reply_pkey" PRIMARY KEY ("id");


--
-- Name: storage storage_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage"
    ADD CONSTRAINT "storage_pkey" PRIMARY KEY ("id");


--
-- Name: storage_point storage_point_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage_point"
    ADD CONSTRAINT "storage_point_pkey" PRIMARY KEY ("id");


--
-- Name: tip tip_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."tip"
    ADD CONSTRAINT "tip_pkey" PRIMARY KEY ("id");


--
-- Name: user_question user_question_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."user_question"
    ADD CONSTRAINT "user_question_pkey" PRIMARY KEY ("id");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: item_type_name item_type_name_item_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."item_type_name"
    ADD CONSTRAINT "item_type_name_item_type_fkey" FOREIGN KEY ("item_type") REFERENCES "public"."item_type"("id");


--
-- Name: question question_correctReply_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."question"
    ADD CONSTRAINT "question_correctReply_fkey" FOREIGN KEY ("correct_reply") REFERENCES "public"."reply"("id");


--
-- Name: recycle_items recycle_items_storage_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."recycle_items"
    ADD CONSTRAINT "recycle_items_storage_fkey" FOREIGN KEY ("storage") REFERENCES "public"."storage"("id");


--
-- Name: recycle_items recycle_items_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."recycle_items"
    ADD CONSTRAINT "recycle_items_type_fkey" FOREIGN KEY ("item_type") REFERENCES "public"."item_type"("id");


--
-- Name: recycle_items recycle_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."recycle_items"
    ADD CONSTRAINT "recycle_items_user_id_fkey" FOREIGN KEY ("recycle_user") REFERENCES "public"."users"("id");


--
-- Name: reply reply_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."reply"
    ADD CONSTRAINT "reply_question_fkey" FOREIGN KEY ("question") REFERENCES "public"."question"("id");


--
-- Name: storage_point storage_point_position_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage_point"
    ADD CONSTRAINT "storage_point_position_fkey" FOREIGN KEY ("position") REFERENCES "public"."position"("id");


--
-- Name: storage storage_storagePoint_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage"
    ADD CONSTRAINT "storage_storagePoint_fkey" FOREIGN KEY ("storage_point") REFERENCES "public"."storage_point"("id");


--
-- Name: storage storage_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."storage"
    ADD CONSTRAINT "storage_type_fkey" FOREIGN KEY ("item_type") REFERENCES "public"."item_type"("id");


--
-- Name: user_question user_question_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."user_question"
    ADD CONSTRAINT "user_question_question_fkey" FOREIGN KEY ("question") REFERENCES "public"."question"("id");


--
-- Name: user_question user_question_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."user_question"
    ADD CONSTRAINT "user_question_user_fkey" FOREIGN KEY ("user") REFERENCES "public"."users"("id");


--
-- Name: user_question user_question_user_reply_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."user_question"
    ADD CONSTRAINT "user_question_user_reply_fkey" FOREIGN KEY ("user_reply") REFERENCES "public"."reply"("id");


--
-- Name: users users_collective_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_collective_fkey" FOREIGN KEY ("collective") REFERENCES "public"."collective"("id");


--
-- Name: users users_position_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mwwmxiljosjphk
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_position_fkey" FOREIGN KEY ("last_position") REFERENCES "public"."position"("id");


--
-- PostgreSQL database dump complete
--

